import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    let tasks = Object.assign([], TASKS);
    return {tasks};
  }
  genId(tasks: Task[]): number{
    return tasks.length;
  } 
  constructor() { }
}
