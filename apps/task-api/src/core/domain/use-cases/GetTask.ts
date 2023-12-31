import { Inject, Service } from 'typedi';
import { Task } from '../entities/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';

@Service()
export class GetTask {
  constructor(@Inject('TaskRepository') private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(taskId);
    return task;
  }
}
