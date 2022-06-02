import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/Task';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Aranjuez',
      description: 'Alcolirycoz',
      done: true,
    },
    {
      id: 2,
      title: 'Reflujo',
      description: 'Alcolirycoz',
      done: false,
    },
    {
      id: 3,
      title: 'Baldor',
      description: 'Alcolirycoz',
      done: true,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }
}
