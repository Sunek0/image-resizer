import { TaskStatus } from '../entities/task-status';

export interface ICreateTaskInput {
  path: string;
  status: TaskStatus;
}
