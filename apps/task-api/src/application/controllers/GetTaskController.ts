import { Service } from 'typedi';
import { Request, Response } from 'express';
import { logger } from '../../config/logger';
import { GetTask } from '../../core/domain/use-cases/GetTask';

@Service()
export class GetTaskController {
  constructor(private getTaskUseCase: GetTask) {}

  async request(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params;
      const task = await this.getTaskUseCase.execute(taskId);

      if (task) {
        res.status(200).send(task);
      } else {
        res.status(400).send({
          message: 'Task not found',
        });
      }

    } catch (error: any) {
      logger.error({ error, reqId: req.id }, 'Error fetching a task');
      res.status(500).send({
        message: 'Error fetching a task',
      });
    }
  }
}
