import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ZERO_DURATION } from 'src/duration';
import { Task } from './task';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const tasks = [
      {id : 0, name: "", description: "", duration: ZERO_DURATION, prerequisite: [] },
    ];
    return {tasks};
  }
  genId(tasks: Task[]): number{
    return tasks.length;
  } 
  constructor() { }
}
