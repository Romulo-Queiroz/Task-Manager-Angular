import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
      password: ['', Validators.required],
      isLogged: ['', Validators.required]
    });
    let user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      isLogged: false
    };
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onSubmit() { 
   let user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      isLogged: false
    };
  
    this.http.post<any>('http://localhost:5021/Authenticate', user).subscribe(
      response => {
        if (response && response.isLogged === true) {
          user.isLogged = true;
          console.log('User logged in successfully');
          this.router.navigate(['/tasks']);
        } 
        else {
          console.log('User not logged in');
        }
      },
      error => {
        console.log('HTTP request error:', error);
        if (error.status === 400)
          alert('Senha ou usuário inválidos');
        else
          alert('HTTP request error');
      }
    );
  }
}

//bora!!!!