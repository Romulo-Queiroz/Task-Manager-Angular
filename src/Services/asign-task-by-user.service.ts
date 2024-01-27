import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "./enviroment";
import { TodoModel } from "src/Models/Todo.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root', 
})

export class AsignTaskByUserService {
  constructor(private http: HttpClient) {}

  asignTaskToUser(newTask: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (!user || !user.id) {
      return throwError('ID do usuário inválido.');
    }
  
    const url = `${environment.apiBaseUrl}/asignTask`;
  
    const taskModel: TodoModel = {
      title: newTask.Title,
      description: newTask.Description,
      done: newTask.Done,
      CategorieTaskId: newTask.CategorieTaskId,
      userId: user.id
    };
  
    return this.http.post(url, taskModel).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}