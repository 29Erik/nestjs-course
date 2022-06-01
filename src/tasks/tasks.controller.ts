import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
//? DTO's
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks(): { hello: string } {
    return { hello: 'Hi' };
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): string {
    console.log(task);
    return `Creating Task`;
  }

  @Put()
  updateTask(): string {
    return `Updating a Task`;
  }

  @Delete()
  deleteTask(): string {
    return `Deleting a Task`;
  }
}
