import { Task } from "../../../src/core/domain/entities/task";
import { TaskStatus } from "../../../src/core/domain/entities/task-status";
import { ITaskRepository } from "../../../src/core/repositories/task.repository";

export class DummyTaskRepository implements ITaskRepository {
  add(task: Task): Promise<Task> {
    return Promise.resolve(new Task('foobar', TaskStatus.Processing));
  }
  findById(taskId: string): Promise<Task | null> {
    return Promise.resolve(null);
  }
  update(taskId: string, status: TaskStatus): Promise<any> {
    return Promise.resolve(null);
  }
}
