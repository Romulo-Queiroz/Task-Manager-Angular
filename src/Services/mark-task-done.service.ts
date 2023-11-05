import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root',
})
export class MarkTaskAsUndoneService {
  constructor(private http: HttpClient) {}

  markTaskAsDone(taskId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/done/${taskId}`;
    return this.http.put(url, { done: true });
  }
}
