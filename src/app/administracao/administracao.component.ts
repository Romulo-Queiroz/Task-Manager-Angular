import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DesignarTarefaComponent } from '../designar-tarefa/designar-tarefa.component';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  openDesignarTarefaModal() {
    const modalRef = this.modalService.open(DesignarTarefaComponent);
  }

}
