import { Inject, Service } from 'typedi';
import { join } from 'path';
import errors from 'common-errors';
import { Task } from '../entities/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { ICreateTaskInput } from '../interfaces/ICreateTaskInput';
import { IFileService } from '../../services/IFileService';
import { TaskStatus } from '../entities/TaskStatus';

@Service()
export class CreateTask {
  constructor(
    @Inject('TaskRepository') private taskRepository: ITaskRepository,
    @Inject('FileService') private fileService: IFileService
  ) {}

  async execute(input: ICreateTaskInput): Promise<Task> {
    const { localDirectory, fileName } = input;

    const filePath = join(localDirectory, fileName);

    const fileExists = await this.fileService.fileExists(filePath);

    if (!fileExists) {
      throw new errors.io.FileNotFoundError(`${filePath} not exists`);
    }
    const task = new Task(fileName, TaskStatus.Processing);
    await this.taskRepository.add(task);
    return task;
  }
}
