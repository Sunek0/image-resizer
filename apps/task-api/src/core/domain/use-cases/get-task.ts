import { Task } from '../entities/task';
import { ITaskRepository } from '../../repositories/task.repository';

export class GetTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(taskId);
    return task;
  }
}
