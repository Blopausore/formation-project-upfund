import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';



const routes: Routes = [
  { path : '', redirectTo: '/tasks', pathMatch: 'full'},
  { path: 'detail/:id', component: TaskDetailComponent},
  { path: 'heroes', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{
}