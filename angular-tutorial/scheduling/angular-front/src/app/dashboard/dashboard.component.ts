import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  tasks: Task[] = [];
  selectedTask?: Task;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService
  ){}
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  onSelect(task: Task){
    this.selectedTask = task;
    this.messageService.add(`TasksComponent: Selected task id=${task.id}`)
  }
}
