import { Component } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
 naveName = "Login";
 tarefasNaoFeitas = 0;

  constructor() { 
  }

  ngOnInit() {
   const user = localStorage.getItem('user');
   if(user){
      this.naveName = "Sair";
   }
  }

}
