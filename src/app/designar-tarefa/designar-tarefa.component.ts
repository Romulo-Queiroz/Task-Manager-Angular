import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-designar-tarefa',
  templateUrl: './designar-tarefa.component.html',
  styleUrls: ['./designar-tarefa.component.css']
})
export class DesignarTarefaComponent {

  taskForm: FormGroup;
  users: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { 
    this.taskForm = this.formBuilder.group({
      taskTitle: [''],
      taskDescription: [''],
      taskCategory: [''],
      taskUser: [''],
    });
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
