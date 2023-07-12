import { Inject, Service } from 'typedi';
import { join, parse } from 'path';
import { IFileService } from '../../services/file.service';
import { IImageInfoService } from '../../services/image-info.service';
import { IImageRepository } from '../../repositories/image.repository';
import { ILambdaService } from '../../services/lambda.service';
import { ITaskRepository } from '../../repositories/task.repository';
import { TaskStatus } from '../entities/task-status';
import { IUploadFileInput } from '../interfaces/upload-file-input';
import { IFileChecksumService } from '../../services/file-checksum.service';
import { File } from '../entities/file';
import { IFileRepository } from '../../repositories/file.repository';
import { Image } from '../entities/image';
import { IProcessTaskInput } from '../interfaces/process-task-input';

@Service()
export class ProcessTask {
  constructor(
    @Inject('FileChecksumService') private fileChecksumService: IFileChecksumService,
    @Inject('FileRepository') private fileRepository: IFileRepository,
    @Inject('FileService') private fileService: IFileService,
    @Inject('ImageInfoService') private imageInfoService: IImageInfoService,
    @Inject('ImageRepository') private imageRepository: IImageRepository,
    @Inject('LambdaService') private lambdaService: ILambdaService,
    @Inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(input: IProcessTaskInput): Promise<void> {
    const { taskId, imageDirectory, outputDirectory, fileName} = input;
    try {
      const imageStream = this.fileService.getReaderStream(join(imageDirectory, fileName));

      const file = new File(fileName, imageStream);
      const uploadFilePromise = this.fileRepository.putItem(file);
      const imageInfoPromise = this.imageInfoService.getImageInfo(imageStream);
      const hash = this.fileChecksumService.computeChecksum(imageStream);

      const [imageInfo] = await Promise.all([imageInfoPromise, uploadFilePromise]);

      hash.end();
      const checksum = hash.read();

      const image = new Image(fileName, checksum, imageInfo?.width || 0, imageInfo?.height || 0);
      const originalImage = await this.imageRepository.add(image);
      const lambdaResult = await this.lambdaService.resizeImage(originalImage.id);

      const getBigImagePromise = this.imageRepository.findById(lambdaResult.imageBigId);
      const getLittleImagePromise = this.imageRepository.findById(lambdaResult.imageLittleId);

      const [getBigImage, getLittleImage] = await Promise.all([getBigImagePromise, getLittleImagePromise]);

      if (!getBigImage || !getLittleImage) {
        await this.taskRepository.update(taskId, TaskStatus.Failed);
      } else if (getBigImage && getLittleImage) {
        const getBigFilePromise = await this.fileRepository.getItem(getBigImage.path);
        const getLittleFilePromise = await this.fileRepository.getItem(getLittleImage.path);

        const [getBigFile, getLittleFile] = await Promise.all([getBigFilePromise, getLittleFilePromise]);

        const fileNameParsed = parse(fileName);

        const pathBig = join(outputDirectory, fileNameParsed.name, '1024');
        const pathLittle = join(outputDirectory, fileNameParsed.name, '800');

        const createBigImageFolderPromise = this.fileService.createFolder(pathBig, true);
        const createLittleImageFolderPromise = this.fileService.createFolder(pathLittle, true);
        await Promise.all([createBigImageFolderPromise, createLittleImageFolderPromise]);

        const bigImageStream = this.fileService.getWritableStream(join(pathBig, ` ${checksum}${fileNameParsed.ext}`));
        const littleImageStream = this.fileService.getWritableStream(join(pathLittle, ` ${checksum}${fileNameParsed.ext}`));

        getBigFile?.data.Body.pipe(bigImageStream);
        getLittleFile?.data.Body.pipe(littleImageStream);

        await this.taskRepository.update(taskId, TaskStatus.Completed);
      }
    } catch (error) {
      console.log(error);
      await this.taskRepository.update(taskId, TaskStatus.Failed);
    }
  }
}
