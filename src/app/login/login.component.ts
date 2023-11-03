import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService }  from '../Services/auth.service';


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
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      isLogged: ['', Validators.required]
    });
  }
  
ngOnInit() {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/']);
    }
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

    this.http.post('http://localhost:5021/Authenticate', user).subscribe(
      user => {
       
        this.authService.setUser(user);
        
        this.router.navigate(['/tasks']);
        return user;
      }
    );
  }
}