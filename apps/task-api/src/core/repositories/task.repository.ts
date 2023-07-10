import { Task } from '../domain/entities/task';
import { TaskStatus } from '../domain/entities/task-status';

export interface TaskRepository {
  add(task: Task): Promise<Task>;
  findById(taskId: string): Promise<Task | null>;
  update(taskId: string, status: TaskStatus): Promise<any>;
}
