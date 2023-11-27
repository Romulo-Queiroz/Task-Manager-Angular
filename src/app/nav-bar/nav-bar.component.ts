import { Component } from '@angular/core';
import { userModel } from 'src/Models/user.model';
import { AuthService } from 'src/Services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
 naveName = "Login";
 tarefasNaoFeitas = 0;
 user: userModel = new userModel();

  constructor() { 
  }

  ngOnInit() {
   const user = localStorage.getItem('user');
   if(user){
      this.user = JSON.parse(user);
      this.naveName = "Sair";
   }
  }

}
