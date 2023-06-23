import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Location } from '@angular/common';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnChanges{
  @Input() task? : Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTask();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.task){
      this.taskService.updateTask(this.task);
      for (var pre_task of this.task.prerequisite){
        this.task.starting = Math.max(this.task.starting, pre_task.starting + pre_task.duration);
    }
    }
  }

  getTask(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(task => this.task = task);
  }
  goBack():void {
    this.location.back();
  }
  save(): void {
    if (this.task) {
      for (var pre_task of this.task.prerequisite){
        this.task.starting = Math.max(this.task.starting, pre_task.starting + pre_task.duration);
      }
      this.taskService.updateTask(this.task)
        .subscribe(() => this.goBack());
        console.log(this.task.prerequisite)
    }
  }
  
}
