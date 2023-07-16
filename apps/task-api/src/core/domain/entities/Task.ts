import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './TaskStatus';

export class Task {
    id: string;
    path: string;
    status: TaskStatus;
    createdAt: number;
    updatedAt: number;

    constructor (path: string, status: TaskStatus) {
        this.id = uuidv4();
        this.path = path;
        this.createdAt = new Date().getTime();
        this.status = status;
        const time = new Date().getTime();
        this.createdAt = time;
        this.updatedAt = time;
    }

    // markAsCompleted(): void {
    //   this.status = TaskStatus.Completed;
    //   this.updatedAt = new Date().getTime();
    // }

    // markAsFailed(): void {
    //   this.status = TaskStatus.Failed;
    //   this.updatedAt = new Date().getTime();
    // }
}
