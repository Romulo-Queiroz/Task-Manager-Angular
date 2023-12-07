import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
    providedIn: 'root', 
  })
export class ListAllTasksService {
  constructor(private http: HttpClient) {}

  listAllTasks(): Observable<any> {
      const url = `${environment.apiBaseUrl}/ListllTasks`;
    return this.http.get<any>(url);
  }
}