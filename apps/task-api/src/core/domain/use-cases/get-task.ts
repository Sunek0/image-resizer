import { Task } from '../entities/task';
import { TaskRepository } from '../../repositories/task.repository';

export class GetTask {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(taskId);
    return task;
  }
}
