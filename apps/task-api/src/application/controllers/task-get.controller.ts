import { Service } from 'typedi';
import { Request, Response } from 'express';
import { GetTask } from '../../core/domain/use-cases/get-task';

@Service()
export class GetTaskController {
  constructor(private getTaskUseCase: GetTask) {}

  async request(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const task = await this.getTaskUseCase.execute(taskId);

      res.status(200).send(task);
    } catch (error: any) {
      res.status(400).send({
        success: false,
        message: error.message,
        error
      });
    }
  }
}
