import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';
import { Duration } from 'src/duration';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks : Task[] = [];

  constructor(private taskService: TaskService, private messageService: MessageService){}

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  add(name: string, description: string, minutes: string, prerequisite_id : Number[]){
    const duration : Duration = {
      days:0, hours:Math.floor(Number(minutes)/60), minutes:Number(minutes) % 60, seconds:0
    }
    name = name.trim();
    description = description.trim();

    if (!name ) {return ;}
    var prerequisite: Task[] = [];
    for (var pre_task_id of prerequisite_id) {
      prerequisite.push(this.tasks.filter(t => t.id === pre_task_id)[0])
    }
    this.taskService.addTask(
      {name, description, duration, prerequisite} as Task
      ).subscribe(task => { this.tasks.push(task);});
  }
  delete(task : Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }

}
