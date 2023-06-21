import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { TASKS } from './mock-tasks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) { }

  private log(message: string){
    this.messageService.add(`TaskService: ${message}`);
  }
  private tasksUrl = 'api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      tap(_ => this.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getHeroes, []'))
    );
  }


  getTask(id: number): Observable<Task>{
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result? : T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);//log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: Task) => this.log(`added task w\ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updatedTask'))
    );
  }
  
}
