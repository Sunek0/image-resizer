import { Task } from "../../../src/core/domain/entities/Task";
import { TaskStatus } from "../../../src/core/domain/entities/TaskStatus";
import { ITaskRepository } from "../../../src/core/repositories/ITaskRepository";

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
