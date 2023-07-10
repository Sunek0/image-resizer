import { TaskStatus } from "../entities/task-status";

export interface UpdateTaskInput {
  id: string;
  status: TaskStatus;
}
