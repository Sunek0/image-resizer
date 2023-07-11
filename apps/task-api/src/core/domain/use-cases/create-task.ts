import { Task } from '../entities/task';
import { ITaskRepository } from '../../repositories/task.repository';
import { ICreateTaskInput } from '../interfaces/create-task-input';


export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(input: ICreateTaskInput): Promise<Task> {
    const { path, status } = input;
    const task = new Task(path, status);
    await this.taskRepository.add(task);
    return task;
  }
}
