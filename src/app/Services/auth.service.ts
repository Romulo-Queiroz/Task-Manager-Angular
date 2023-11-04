import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "./enviroment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private http: HttpClient) { }

  authenticate(user: any): Observable<any> {
    const url = `${environment.apiBaseUrl}/api/login/authenticate`;
    return this.http.post(url, user).pipe(
      map((response) => {
        this.user = response;
        localStorage.setItem('user', JSON.stringify(this.user));
        return this.user;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  setUser(user: any) {
    this.user = user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  getUser(): any {
    return this.user;
  }
}
