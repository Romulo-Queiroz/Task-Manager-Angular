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

  if (user && user.id) {
    const url = `${environment.apiBaseUrl}/insertTask/${user.id}`;
    return this.http.post(url, newTask).pipe(
      map((response) => {
        this.closeModal();
        console.log("Tarefa criada com sucesso!");
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  } else {
    console.error('ID do usuário não encontrado no Local Storage ou valor inválido.');
    return throwError('Erro ao obter ID do usuário');
  }
}

  updateTask(taskId: number, updatedTaskData: any): Observable<any> {
    const url = `${environment.apiBaseUrl}/Edit/${taskId}`;

    const taskModel: TodoModel = {
      title: updatedTaskData.title,
      description: updatedTaskData.description,
      done: updatedTaskData.done,
    };

    return this.http.put(url, taskModel).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
