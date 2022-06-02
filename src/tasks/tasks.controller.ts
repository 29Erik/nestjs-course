import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
//? DTO's
import { CreateTaskDto } from './dto/create-task.dto';
//? Service use
import { TasksService } from './tasks.service';
//? Interface uses
import { Task } from './interfaces/Task';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string) {
    return this.taskService.getTask(parseInt(taskId));
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): string {
    console.log(task);
    return `Creating Task`;
  }

  @Put(`:id`)
  updateTask(@Body() updatedTask: CreateTaskDto, @Param(`id`) id): string {
    return `Updating a Task`;
  }

  @Delete(`:id`)
  deleteTask(@Param(`id`) id): string {
    return `Deleting a Task ${id}`;
  }
}
