import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
    providedIn: 'root', 
  })
export class DeleteTaskService {
  constructor(private http: HttpClient) {}

  deleteTask(taskId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/deletar/${taskId}`;
    return this.http.delete(url).pipe((response) => {
      return response;
    });
  }
}