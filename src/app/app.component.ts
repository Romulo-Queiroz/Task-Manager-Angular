import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoListFront';
  user: any;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']); 
      this.user = this.authService.getUser();
    }
    
  }
 
 
  
}

