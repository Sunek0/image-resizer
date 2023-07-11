import { TaskStatus } from '../entities/task-status';

export interface IUpdateTaskInput {
  id: string;
  status: TaskStatus;
}
