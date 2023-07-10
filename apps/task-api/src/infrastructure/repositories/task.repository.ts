import { TableClient, defineTable } from "@hexlabs/dynamo-ts";
import { Task } from "../../core/domain/entities/task";
import { TaskRepository } from "../../core/repositories/task.repository";
import { DynamoDBRepository } from "./ddb.repository";
import { TaskStatus } from "../../core/domain/entities/task-status";

const tableName = process.env.TASK_TABLE_NAME;

export class TasksRepositoryDDB extends DynamoDBRepository implements TaskRepository {
  taskClient: any;

  constructor() {
    super();

    const taskTableDefinition = defineTable(
      {
        id: 'string',
        path: 'string',
        status: 'string',
        createdAt: 'number',
        updatedAt: 'number'
      },
      'id',
    );

    this.taskClient = TableClient.build(taskTableDefinition, {
      tableName: tableName,
      client: this.dbClient,
      logStatements: true
    });

  }

  async add(task: Task): Promise<Task> {
    const params = {
      id: task.id,
      path: task.path,
      status: task.status.toString() ,
      cretedAt: task.createdAt.toString(),
      updatedAt: task.updatedAt.toString()
    }

    await this.taskClient.put(params)

    return task;
  }

  async findById(taskId: string): Promise<any> {
    const params = {
      id: taskId
    }

    const result = await this.taskClient.get(params);

    return result.item;
  }

  async update(taskId: string, status: TaskStatus): Promise<void> {
    const params = {
      key: {
        id: taskId
      },
      updates: {
        status: status.toString(),
        updatedAt: new Date().getTime().toString()
      }
    }

    await this.taskClient.update(params)
  }
}
