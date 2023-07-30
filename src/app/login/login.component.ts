import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onSubmit() { 
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      isLogged: false
    };
  
    this.http.post<any>('http://localhost:5021/Authenticate', user).subscribe(
      response => {
        if (response && response.isLogged === true) {
          console.log('User logged in successfully');
          user.isLogged = true;
          this.router.navigate(['/tasks']);
        } else {
          console.log('Authentication failed');
          //get div password and show error message
          var passwordDiv =  document.getElementById('password');
          if (passwordDiv) {
            passwordDiv.innerHTML = 'Invalid username or password';
          }
          if (this.loginForm.value.password) {
            this.loginForm.value.password = '';
          }
        }
      },
      error => {
        console.log('HTTP request error:', error);
        // Handle HTTP request error here (e.g., show error message)
      }
    );
  }
}

