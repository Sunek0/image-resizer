import { Inject, Service } from 'typedi';
import { ITaskRepository } from '../../repositories/task.repository';
import { IUpdateTaskInput } from '../interfaces/update-task-input';

@Service()
export class UpdateTask {
  constructor(@Inject('TaskRepository') private taskRepository: ITaskRepository) {}

  async execute(input: IUpdateTaskInput): Promise<void> {
    const { id, status } = input;
    await this.taskRepository.update(id, status);
  }
}
