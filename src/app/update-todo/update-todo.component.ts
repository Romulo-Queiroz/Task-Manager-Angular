import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCreateTasksService } from '../../Services/update-create-tasks.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {
  taskForm: FormGroup;
  tarefa: any;
  taskId!: number;

  constructor(private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private updateCreateTasksService: UpdateCreateTasksService) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required], 
      description: ['', Validators.required] 
    });
  }  
  
  closeModal() {
    this.modalService.dismissAll();
  }

updateTask() {
    const task = this.taskForm.getRawValue();
    this.updateCreateTasksService.updateTask(this.taskId, task).subscribe(
      response => {
        if(response) {
          console.log('Tarefa atualizada com sucesso:', response);
          this.closeModal();
          window.location.reload();
        }
      },
      error => {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    );
  }
  
}
