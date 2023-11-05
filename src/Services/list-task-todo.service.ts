import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root',
})
export class ListTaskTodoService {
  constructor(private http: HttpClient) {}

  listTasktodo(): Observable<any> {
    const url = `${environment.apiBaseUrl}/TasksToDo`;
    return this.http.get<any>(url);
  }
}
