import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const tasks = [
      {id : 0, name: "Chillout", description: "Nothin to do here, take a coffe and chill", duration: 0, prerequisite: [] },
      {id : 1, name: "Chillin", description: "Again, nothin to do here, go take a smoke", duration: 0, prerequisite: [] },

    ];
    return {tasks};
  }
  genId(tasks: Task[]): number{
    return tasks.length;
  } 
  constructor() { }
}
