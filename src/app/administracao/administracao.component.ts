import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DesignarTarefaComponent } from '../designar-tarefa/designar-tarefa.component';
import { ListUsersService } from 'src/Services/list-users.service';
import { userModel } from 'src/Models/user.model';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent {

  users: userModel[] = [];

  constructor(
    private modalService: NgbModal,
    private listarUsuarios: ListUsersService
  ) { }

  ngOnInit() {
   
  }
  
  openDesignarTarefaModal() {
    const modalRef = this.modalService.open(DesignarTarefaComponent);
  }

}
