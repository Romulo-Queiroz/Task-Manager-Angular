import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './enviroment';
import { LoginResponse } from 'src/Interfaces/login.interface';
import { userModel } from 'src/Models/user.model';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  token: string | null = null;

  constructor(private http: HttpClient,
    private route:Router ) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token && this.isTokenValid(token)) {
      this.user.isLogged = true;
    } else {
      this.logout();
    }
  }

  authenticate(user: userModel): Observable<LoginResponse> {
    const url = `${environment.apiBaseUrl}/api/login/authenticate`;
    return this.http.post<any>(url, user).pipe(
      map((response) => {
        if (response && response.value && response.value.user) {
          this.user = response.value;
          const userData = {
            id: this.user.user.id,
            username: this.user.user.username,
            isAdmin: this.user.user.isAdmin,
            isLogged: true
          };
         
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('jwtToken', this.user.token);
          return this.user;
        } else {
          console.error('Resposta do servidor é inválida:', response);
        }
      }),
    );
  }
  

  setUser(user: LoginResponse) {
    user.isLogged = true;
    this.user = user;
  }

  isLoggedIn(): boolean {
    if (this.user == null && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return !!this.user;
  }

  getUser(): any {
    return this.user;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    this.route.navigate(['/login']);
  }

  isTokenValid(token?: string): boolean {
    if (token === null || token === undefined) {
      return false;
    }
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
