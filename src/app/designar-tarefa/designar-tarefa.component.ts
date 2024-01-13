import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userModel } from 'src/Models/user.model';
import { ListUsersService } from 'src/Services/list-users.service';

@Component({
  selector: 'app-designar-tarefa',
  templateUrl: './designar-tarefa.component.html',
  styleUrls: ['./designar-tarefa.component.css']
})
export class DesignarTarefaComponent {

  taskForm: FormGroup;
  users: userModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private listarUsuarios: ListUsersService
  ) { 
    this.taskForm = this.formBuilder.group({
      taskTitle: [''],
      taskDescription: [''],
      taskCategory: [''],
      taskUser: [''],
    });
  }

   ngOnInit() {
    this.listarUsuarios.listUsers().subscribe((data:any) => {
      this.users = JSON.parse(JSON.stringify(data.value));
      console.log("usuarios listados", data.value);
      console.log("usuarios listados (formato JSON)", JSON.stringify(data.value));
    });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

}
