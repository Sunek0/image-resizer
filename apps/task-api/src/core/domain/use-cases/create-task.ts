import { Inject, Service } from 'typedi';
import { Task } from '../entities/task';
import { ITaskRepository } from '../../repositories/task.repository';
import { ICreateTaskInput } from '../interfaces/create-task-input';

@Service()
export class CreateTask {
  constructor(@Inject('TaskRepository') private taskRepository: ITaskRepository) {}

  async execute(input: ICreateTaskInput): Promise<Task> {
    const { path, status } = input;
    const task = new Task(path, status);
    await this.taskRepository.add(task);
    return task;
  }
}
