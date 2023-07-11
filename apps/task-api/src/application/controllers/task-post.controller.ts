import { Request, Response } from 'express';
import { join, parse } from 'path';
import { Service } from 'typedi';
import { logger } from '../../config/logger';
import { CreateTask } from '../../core/domain/use-cases/create-task';
import { ProcessTask } from '../../core/domain/use-cases/process-task';
import { ICreateTaskInput } from '../../core/domain/interfaces/create-task-input';
import { TaskStatus } from '../../core/domain/entities/task-status';


@Service()
export class PostTaskController {
  constructor(
    private createTaskUseCase: CreateTask,
    private processTaskUseCase: ProcessTask,
  ) {}

  async request(req: Request, res: Response): Promise<void> {
    const { imagePath } = req.body;
    const filePath = join(__dirname, '../../../images', imagePath);
    let taskData;

    try {
      const createTaskInput: ICreateTaskInput = {
        path: filePath,
        status: TaskStatus.Processing
      };
      taskData = await this.createTaskUseCase.execute(createTaskInput);

      res.status(202).send(taskData);
    } catch (error: any) {
      logger.error(error, 'Error creating a task');
      res.status(400).send({
        success: false,
        message: 'Error creating a task',
      });
    }

    await this.processTaskUseCase.execute(taskData.id, imagePath);
  }
}
