import { ITaskRepository } from '../../repositories/task.repository';
import { IUpdateTaskInput } from '../interfaces/update-task-input';


export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(input: IUpdateTaskInput): Promise<void> {
    const { id, status } = input;
    await this.taskRepository.update(id, status);
  }
}
