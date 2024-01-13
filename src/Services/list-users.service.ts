import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./enviroment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
    })
export class ListUsersService {
    constructor(private http: HttpClient) {}

    listUsers(): Observable<any> {
        const url = `${environment.apiBaseUrl}/api/login/ListUsers`;
      return this.http.get<any>(url);
    }
}
