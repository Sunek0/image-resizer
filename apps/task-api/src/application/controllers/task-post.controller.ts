import { Request, Response } from 'express';
import { join } from 'path';
import { Service } from 'typedi';
import { logger } from '../../config/logger';
import { CreateTask } from '../../core/domain/use-cases/create-task';
import { ProcessTask } from '../../core/domain/use-cases/process-task';
import { ICreateTaskInput } from '../../core/domain/interfaces/create-task-input';
import { IProcessTaskInput } from '../../core/domain/interfaces/process-task-input';
import { IPostTaskInput } from '../dto/post-task.input';


@Service()
export class PostTaskController {
  constructor(
    private createTaskUseCase: CreateTask,
    private processTaskUseCase: ProcessTask,
  ) {}

  async request(req: Request, res: Response): Promise<void> {
    const { imageFile }: IPostTaskInput = req.body;
    let taskData;

    try {
      const createTaskInput: ICreateTaskInput = {
        fileName: imageFile,
        localDirectory: join(global.appRoot, 'images')
      };
      taskData = await this.createTaskUseCase.execute(createTaskInput);

      res.status(202).send(taskData);
    } catch (error: any) {
      logger.error(error, 'Error creating a task');
      if (error.type == 'FileNotFoundError') {
        res.status(400).send({
          message: 'Image not found',
        });
      }
      else {
        res.status(400).send({
          message: 'Error creating a task',
        });
      }
    }

    const processTaskInput: IProcessTaskInput = {
      fileName: imageFile,
      imageDirectory: join(global.appRoot, 'images'),
      outputDirectory: join(global.appRoot, 'output'),
      taskId: taskData.id
    };
    await this.processTaskUseCase.execute(processTaskInput);
  }
}
