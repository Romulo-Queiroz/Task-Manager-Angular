import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
    providedIn: 'root', 
  })
export class UpdateCreateTasksService  {
    constructor(private http: HttpClient) {}

    createTask(newTask:any): Observable<any> {
        const url = `${environment.apiBaseUrl}/inserir`;
        return this.http.post(url, newTask).pipe(
            (response) => {
                return response;
            }
        );
    }
}