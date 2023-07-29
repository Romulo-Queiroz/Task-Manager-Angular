import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    username: '',
    password: ''
  };

  onSubmit() {
    // Aqui você pode adicionar a lógica de autenticação real.
    // Por exemplo, você pode chamar um serviço de autenticação
    // para verificar as credenciais fornecidas pelo usuário.

    // Neste exemplo, vamos apenas exibir as credenciais no console.
    console.log('Usuário:', this.formData.username);
    console.log('Senha:', this.formData.password);

    // Você pode adicionar lógica adicional aqui, como redirecionar
    // o usuário para a página de dashboard após o login bem-sucedido.
  }
}
