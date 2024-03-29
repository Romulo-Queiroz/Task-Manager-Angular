import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DesignarTarefaComponent } from '../designar-tarefa/designar-tarefa.component';
import { userModel } from 'src/Models/user.model';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent {

  users: userModel[] = [];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
   
  }
  
  openDesignarTarefaModal() {
    const modalRef = this.modalService.open(DesignarTarefaComponent);
  }
  openCreateUsuarioModal() {
    const modalRef = this.modalService.open(CreateUserComponent);
  }
}
