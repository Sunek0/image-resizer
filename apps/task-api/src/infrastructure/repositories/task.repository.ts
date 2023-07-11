import config from 'config';
import { Service } from 'typedi';
import { TableClient, defineTable } from '@hexlabs/dynamo-ts';
import { Task } from '../../core/domain/entities/task';
import { ITaskRepository } from '../../core/repositories/task.repository';
import { DynamoDBRepository } from './ddb.repository';
import { TaskStatus } from '../../core/domain/entities/task-status';
import { DynamoDBDatabase } from '../database/dynamodb';

@Service('TaskRepository')
export class TasksRepositoryDDB extends DynamoDBRepository implements ITaskRepository {
  private taskClient: any;

  constructor(protected dynamoDB: DynamoDBDatabase) {
    super(dynamoDB);

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
      tableName: config.aws.dynamodb.tables.tasks,
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
    };

    await this.taskClient.put(params);

    return task;
  }

  async findById(taskId: string): Promise<any> {
    const params = {
      id: taskId
    };

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
    };

    await this.taskClient.update(params);
  }
}
