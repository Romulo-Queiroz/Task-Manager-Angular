import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService }  from '../../Services/auth.service';
import { userModel } from 'src/Models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  token: string | null = "null";
  user : userModel = new userModel();
  showError: boolean = false;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
ngOnInit() {
  const user = localStorage.getItem('user');
  if (user) {
    this.user = JSON.parse(user);
  }

}
  
  closeModal() {
    this.modalService.dismissAll();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        isLogged: false
      };
  
      this.authService.authenticate(user).subscribe(
        (response) => {
          this.authService.setUser(response);
          this.router.navigate(['/task-done']);
          window.location.reload();
        },
        (error) => {
          this.showError = true;
          console.log(error);
        }
      );
    }
    else {
      this.showError = true;
    }
  }
  

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}