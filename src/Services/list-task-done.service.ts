import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
    providedIn: 'root', 
  })
export class ListTaskDoneService {
  constructor(private http: HttpClient) {}

  listTaskDone(): Observable<any> {
      const url = `${environment.apiBaseUrl}/ListTaskDone`;
    return this.http.get<any>(url);
  }
}