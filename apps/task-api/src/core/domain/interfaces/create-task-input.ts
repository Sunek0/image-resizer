import { TaskStatus } from "../entities/task-status";

export interface CreateTaskInput {
  path: string;
  status: TaskStatus;
}
