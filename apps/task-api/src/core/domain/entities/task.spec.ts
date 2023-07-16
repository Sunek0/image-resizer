import * as uuid from 'uuid';
import { Task } from './task'
import { TaskStatus } from './task-status'

jest.mock('uuid');
const uuidSpy = jest.spyOn(uuid, 'v4');

describe('Domain task entity unit tests', () => {
  it('should constructor populate properties', () => {
    const path = 'foobar';
    const status = TaskStatus.Completed;
    const task = new Task(path, status);

    expect(uuidSpy).toHaveBeenCalledTimes(1);
    expect(task.path).toStrictEqual(path);
    expect(task.status).toStrictEqual(status);
    expect(task.createdAt).toBeNumber();
    expect(task.updatedAt).toBeNumber();
  });
});
