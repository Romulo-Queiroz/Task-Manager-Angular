import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './enviroment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root',
})
export class AsignTaskService {
    constructor(private http: HttpClient) {}

    createTask(newTask: any): Observable<any> {
        const url = `${environment.apiBaseUrl}/asignTask`;

        console.log('Em asign-task.service.ts: tenho newTask = ', newTask);
        return this.http.post(url, newTask).pipe(
            map((response: any) => response),
            catchError((error: any) => {
                return throwError(error);
            })
        );
    }


}