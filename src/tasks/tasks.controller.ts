import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
//? DTO's
import { CreateTaskDTO } from './dto/task.dto';
//? Service use
import { TasksService } from './tasks.service';
//? Interface uses
import { Task } from './interfaces/task.interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async createTask(
    @Res() res,
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    const task = await this.taskService.createTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: `Task ${createTaskDTO.title} created`,
      task,
    });
  }

  @Get()
  async getTasks(@Res() res): Promise<Task[]> {
    const tasks = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json({
      message: `N° of Tasks: ${tasks.length}`,
      tasks,
    });
  }

  @Get(':taskId')
  async getTask(@Res() res, @Param('taskId') taskId: string): Promise<Task> {
    const task = await this.taskService.getTask(taskId);
    if (!task) throw new NotFoundException(`Task ${taskId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Task: ${task.title}`,
      task,
    });
  }

  @Put(`:taskId`)
  async updateTask(
    @Res() res,
    @Param(`taskId`) taskId: string,
    @Body() updateTask: CreateTaskDTO,
  ): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(taskId, updateTask);
    if (!updatedTask)
      throw new NotFoundException(`Task ${taskId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Task ${updatedTask.title} updated`,
      updatedTask,
    });
  }

  @Delete(`:taskId`)
  async deleteTask(@Res() res, @Param(`taskId`) taskId: string): Promise<Task> {
    const deletedTask = await this.taskService.deleteTask(taskId);
    if (!deletedTask)
      throw new NotFoundException(`Task ${taskId} doesn't exist`);
    return res.status(HttpStatus.OK).json({
      message: `Task ${deletedTask.title} deleted`,
      deletedTask,
    });
  }
}
