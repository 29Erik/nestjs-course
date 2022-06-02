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
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string): Promise<Task> {
    return this.taskService.getTask(taskId);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<string> {
    return this.taskService.createTask(task);
  }

  @Put(`:id`)
  updateTask(
    @Body() updatedTask: CreateTaskDto,
    @Param(`id`) id,
  ): Promise<string> {
    return this.taskService.updateTask(id, updatedTask);
  }

  @Delete(`:id`)
  deleteTask(@Param(`id`) id) {
    return this.taskService.deleteTask(id);
  }
}
