import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interfaces';
import { CreateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async getTask(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskModel.create(createTaskDTO);
  }

  async updateTask(id: string, updateTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskDTO, {
      new: true,
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
