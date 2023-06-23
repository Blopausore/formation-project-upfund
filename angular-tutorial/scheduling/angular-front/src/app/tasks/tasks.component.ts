import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges{
  tasks : Task[] = [];
  selectedPrerequisite : Task[] = [];

  constructor(
    private taskService: TaskService, 
    private messageService: MessageService
    ){}

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedPrerequisite, "Prerequisite added :");
    console.log(changes, "Changes :");
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  genId(): number {
    return this.tasks.length;
  }
  
  add(name: string, description: string, duration_string: string){
    name = name.trim();
    description = description.trim();

    if (!name ) {return ;}
    let duration : number = Number(duration_string).valueOf();
    this.taskService.addTask(
      new Task(this.genId(), name, description, duration, 0, this.selectedPrerequisite) 
      ).subscribe(task => { this.tasks.push(task);});
      this.selectedPrerequisite = [];
  }
  
  delete(task : Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }
}
