import { Request, Response } from 'express';
import { join, parse } from "path";
import fs, { promises as fsp, } from "fs";
import { logger } from '../../config/logger';
import { CreateTask } from '../../core/domain/use-cases/create-task';
import { CreateImage } from '../../core/domain/use-cases/create-image';
import { CallLambda } from '../../core/domain/use-cases/call-lambda';
import { GetImageInfo } from '../../core/domain/use-cases/get-image-info';
import { GetFileChecksum } from '../../core/domain/use-cases/get-file-checksum';
import { GetImage } from '../../core/domain/use-cases/get-image';
import { GetFile } from '../../core/domain/use-cases/get-file';
import { UpdateTask } from '../../core/domain/use-cases/update-task';
import { UploadFile } from '../../core/domain/use-cases/upload-file';
import { TasksRepositoryDDB } from '../../infrastructure/repositories/task.repository';
import { CreateTaskInput } from '../../core/domain/interfaces/create-task-input';
import { UpdateTaskInput } from '../../core/domain/interfaces/update-task-input';
import { TaskStatus } from '../../core/domain/entities/task-status';
import { AWSLambdaInteractor } from '../../infrastructure/interactors/aws-lambda.interactor';
import { LocalImageInfoInteractor } from '../../infrastructure/interactors/local-image-info.interactor';
import { LocalChecksumInteractor } from '../../infrastructure/interactors/local-checksum.interactor';
import { FileRepositoryS3 } from '../../infrastructure/repositories/file.repository';
import { UploadFileInput } from '../../core/domain/interfaces/upload-file-input';
import { ImagesRepositoryDDB } from '../../infrastructure/repositories/image.repository';
import { CreateImageInput } from '../../core/domain/interfaces/create-image-input';

const taskRepository = new TasksRepositoryDDB();
const imageRepository = new ImagesRepositoryDDB();
const fileRepository = new FileRepositoryS3();
const lambdaInteractor = new AWSLambdaInteractor();
const localImageInteractor = new LocalImageInfoInteractor();
const localChecksumInteractor = new LocalChecksumInteractor();

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { imagePath } = req.body;
  const filePath = join(__dirname, '../../../images', imagePath)
  let taskData

  try {
    const createTaskUseCase = new CreateTask(taskRepository);
    const createTaskInput: CreateTaskInput = {
      path: imagePath,
      status: TaskStatus.Processing
    }

    const fileExists = await fsp.stat(filePath).catch(e => false);

    if (!fileExists) {
      res.status(400).send({
        success: false,
        message: 'File not exists',
      });
    }

    taskData = await createTaskUseCase.execute(createTaskInput);

    res.status(202).send(taskData);
  } catch (error: any) {
    logger.error(error, 'Error creating a task')
    res.status(400).send({
      success: false,
      message: 'Error creating a task',
    });
  }

  try {
    const imageStream = fs.createReadStream(filePath);
    const getImageInfoUseCase = new GetImageInfo(localImageInteractor);
    const getFileChecksumUseCase = new GetFileChecksum(localChecksumInteractor);
    const uploadFileUseCase = new UploadFile(fileRepository);

    const uploadFileInput: UploadFileInput = {
      filename: filePath,
      data: imageStream
    };

    const imageInfoPromise = getImageInfoUseCase.execute(imageStream);
    const hash = getFileChecksumUseCase.execute(imageStream);
    const uploadFilePromise = uploadFileUseCase.execute(uploadFileInput);

    const [imageInfo, uploadFile] = await Promise.all([imageInfoPromise, uploadFilePromise]);

    hash.end();
    const checksum = hash.read();

    const createImageUseCase = new CreateImage(imageRepository);
    const createImageInput: CreateImageInput = {
      checksum,
      width: imageInfo?.width || 0,
      height: imageInfo?.height || 0,
      path: imagePath,
      parentId: ''
    }
    const originalImage = await createImageUseCase.execute(createImageInput)


    const callLambdaUseCase = new CallLambda(lambdaInteractor);
    const lambdaResult = await callLambdaUseCase.execute(originalImage.id);

    const getImageUseCase = new GetImage(imageRepository);
    const getFileUseCase = new GetFile(fileRepository);

    const getBigImagePromise = getImageUseCase.execute(lambdaResult.imageBigId);
    const getLittleImagePromise = getImageUseCase.execute(lambdaResult.imageLittleId);

    const [getBigImage, getLittleImage] = await Promise.all([getBigImagePromise, getLittleImagePromise]);

    const updateTaskUseCase = new UpdateTask(taskRepository);

    if (getBigImage && getLittleImage) {
      const getBigFile = await getFileUseCase.execute(getBigImage.path);
      const getLittleFile = await getFileUseCase.execute(getLittleImage.path);

      const parsedImage = parse(filePath);

      const pathBig = join(__dirname, '../../../output', parsedImage.name, '1024');
      const pathLittle = join(__dirname, '../../../output', parsedImage.name, '800');
      await fsp.mkdir(pathBig, { recursive: true });
      await fsp.mkdir(pathLittle, { recursive: true });
      const bigImageStream = fs.createWriteStream(join(pathBig,` ${checksum}${parsedImage.ext}`));
      const littleImageStream = fs.createWriteStream(join(pathLittle,` ${checksum}${parsedImage.ext}`));

      getBigFile?.data.Body.pipe(bigImageStream)
      getLittleFile?.data.Body.pipe(littleImageStream)

      if (taskData) {
        const updateTaskInput: UpdateTaskInput = {
          id: taskData.id || '',
          status: TaskStatus.Completed
        }
        await updateTaskUseCase.execute(updateTaskInput)
      }
    }
    else if (taskData) {
      const updateTaskInput: UpdateTaskInput = {
        id: taskData.id || '',
        status: TaskStatus.Failed
      }
      await updateTaskUseCase.execute(updateTaskInput)
    }
  } catch (error: any) {
    console.log(error)
    if (taskData) {
      const updateTaskInput: UpdateTaskInput = {
        id: taskData.id || '',
        status: TaskStatus.Failed
      }
      const updateTaskUseCase = new UpdateTask(taskRepository);
      await updateTaskUseCase.execute(updateTaskInput)
    }
  }
};
