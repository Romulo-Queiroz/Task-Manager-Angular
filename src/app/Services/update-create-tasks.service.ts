import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';
import { TodoModel } from '../Models/Todo.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root', 
  })
export class UpdateCreateTasksService  {
    constructor(private http: HttpClient) {}

    createTask(newTask:any): Observable<any> {
        const url = `${environment.apiBaseUrl}/insertTask`;
        return this.http.post(url, newTask).pipe(
            (response) => {
                return response;
            }
        );
    }
    updateTask(taskId: number, updatedTaskData: any): Observable<any> {
      const url = `${environment.apiBaseUrl}/Edit/${taskId}`;
      
      const taskModel: TodoModel = {
        title: updatedTaskData.title,
        description: updatedTaskData.description,
        done: updatedTaskData.done
      };
      
      console.log(taskModel);
      return this.http.put(url, taskModel).pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
    }
}