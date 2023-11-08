import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todoListFront';
  user: any;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    console.log('token: ' + token);
    if (token && this.authService.isTokenValid(token)) {
      this.user.isLogged = true;
    } else {
      this.authService.logout();
    }
  }
}
