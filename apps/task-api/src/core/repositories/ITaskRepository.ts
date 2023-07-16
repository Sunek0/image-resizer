import { Task } from '../domain/entities/Task';
import { TaskStatus } from '../domain/entities/TaskStatus';

export interface ITaskRepository {
  add(task: Task): Promise<Task>;
  findById(taskId: string): Promise<Task | null>;
  update(taskId: string, status: TaskStatus): Promise<any>;
}
