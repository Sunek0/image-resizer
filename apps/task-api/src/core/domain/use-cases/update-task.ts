import { TaskRepository } from '../../repositories/task.repository';
import { UpdateTaskInput } from '../interfaces/update-task-input';


export class UpdateTask {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(input: UpdateTaskInput): Promise<void> {
    const { id, status } = input;
    await this.taskRepository.update(id, status);
  }
}
