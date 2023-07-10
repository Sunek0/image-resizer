import { Request, Response } from 'express';
import { TasksRepositoryDDB } from '../../infrastructure/repositories/task.repository';
import { GetTask } from '../../core/domain/use-cases/get-task';

const taskRepository = new TasksRepositoryDDB();

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const createTaskUseCase = new GetTask(taskRepository);
    const task = await createTaskUseCase.execute(taskId);

    res.status(200).send(task);
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message,
      error
    });
  }
};
