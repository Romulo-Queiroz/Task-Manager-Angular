import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }

  
  closeModal() {
    this.modalService.dismissAll();
  }
  createTask() {
    if (this.taskForm.invalid) {
      // Realize ações apropriadas se o formulário for inválido, como exibir mensagens de erro
      return;
    }

    const newTask = {
      Title: this.taskForm.value.taskTitle,
      Description: this.taskForm.value.taskDescription,
      Done: false,
      CreatedAt: new Date()
    };

    this.http.post<any>('http://localhost:5021/home', newTask).subscribe(
      response => {
        // Lógica para tratar a resposta do backend após a criação da tarefa
        console.log('Tarefa criada com sucesso:', response);
        // Fechar o modal após a criação da tarefa
        // ...
      },
      error => {
        console.error('Erro ao criar a tarefa:', error);
      }
    );
  }

}
