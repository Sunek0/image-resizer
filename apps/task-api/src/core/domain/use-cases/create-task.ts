import { Inject, Service } from 'typedi';
import { join } from 'path';
import { Task } from '../entities/task';
import { ITaskRepository } from '../../repositories/task.repository';
import { ICreateTaskInput } from '../interfaces/create-task-input';
import { IFileService } from '../../services/file.service';
import { TaskStatus } from '../entities/task-status';

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
      throw new Error(`${filePath} not exists`);
    }
    const task = new Task(fileName, TaskStatus.Processing);
    await this.taskRepository.add(task);
    return task;
  }
}
