import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';
import { TodoModel } from '../Models/Todo.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { userModel } from 'src/Models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class UpdateCreateTasksService {
  constructor(private http: HttpClient,private modalService: NgbModal) {}
 Nginit () {
 
 }
 closeModal() {
  this.modalService.dismissAll();
}

createTask(newTask: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user || !user.id) {
    return throwError('ID do usuário inválido.');
  }

  const url = `${environment.apiBaseUrl}/insertTask/${user.id}`;

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


  updateTask(taskId: number, updatedTaskData: any): Observable<any> {
    const url = `${environment.apiBaseUrl}/Edit/${taskId}`;

    const taskModel: TodoModel = {
      title: updatedTaskData.title,
      description: updatedTaskData.description,
      done: updatedTaskData.done,
      CategorieTaskId: updatedTaskData.CategorieTaskId,
      userId: updatedTaskData.userId,
    };

    return this.http.put(url, taskModel).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
