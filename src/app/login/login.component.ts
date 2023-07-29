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
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<any>('http://localhost:5021/Authenticate', user).subscribe(
      response => {
        if (response.isLogged) {
          console.log("Usuário logado com sucesso.");
          // Redirecionar o usuário para a página "Tasks"
          this.router.navigate(['/tasks']);
          
        } else {
          console.log("Usuário ou senha incorretos.");
        }
      },
      error => {
        console.error('Erro ao entrar:', error);
      }
    );

    console.log('Formulário enviado.');
  }
}
