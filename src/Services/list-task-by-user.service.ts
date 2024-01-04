import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';
import { ServerResponse } from '../Interfaces/server-response.interface';

@Injectable({
    providedIn: 'root', 
  })
export class ListTaskByUserService {
  constructor(private http: HttpClient) {}

  listTaskByUserId(userId: number): Observable<ServerResponse> {
    const url = `${environment.apiBaseUrl}/ListTaskByUser/${userId}`;
    return this.http.get<ServerResponse>(url);
  }
}