import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
    providedIn: 'root', 
  })
export class ListTaskByUserService {
  constructor(private http: HttpClient) {}

  listTaskByUserId(userId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/ListTaskByUser/${userId}`;
    return this.http.get<any>(url);
  }
}