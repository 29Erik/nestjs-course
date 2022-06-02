import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/Task';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async getTask(id: string): Promise<Task> {
    return await this.taskModel.findById(id);
  }

  async createTask(task: CreateTaskDto): Promise<string> {
    await this.taskModel.create(task);
    return `Successful creation`;
  }

  async updateTask(id: string, task: CreateTaskDto): Promise<string> {
    await this.taskModel.findByIdAndUpdate(id, task);
    return `Updated Task`;
  }

  async deleteTask(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
