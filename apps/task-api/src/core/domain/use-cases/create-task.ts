import { Inject, Service } from 'typedi';
import { parse } from 'path';
import { Task } from '../entities/task';
import { ITaskRepository } from '../../repositories/task.repository';
import { ICreateTaskInput } from '../interfaces/create-task-input';
import { IFileService } from '../../services/file.service';

@Service()
export class CreateTask {
  constructor(
    @Inject('TaskRepository') private taskRepository: ITaskRepository,
    @Inject('FileService') private fileService: IFileService
  ) {}

  async execute(input: ICreateTaskInput): Promise<Task> {
    const { path, status } = input;

    const basePath = parse(path).base;

    const fileExists = await this.fileService.fileExists(path);

    if (!fileExists) {
      throw new Error(`${basePath} not exists`)
    }
    const task = new Task(basePath, status);
    await this.taskRepository.add(task);
    return task;
  }
}
