import { Task } from '../entities/task';
import { TaskRepository } from '../../repositories/task.repository';
import { CreateTaskInput } from '../interfaces/create-task-input';


export class CreateTask {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(input: CreateTaskInput): Promise<Task> {
    const { path, status } = input;
    const task = new Task(path, status);
    await this.taskRepository.add(task);
    return task;
  }
}
