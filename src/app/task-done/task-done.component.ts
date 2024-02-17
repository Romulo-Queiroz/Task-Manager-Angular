import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ListTaskDoneService } from '../../Services/list-task-done.service';
import { ListTaskByUserService } from 'src/Services/list-task-by-user.service';
import { userModel } from 'src/Models/user.model';

@Component({
  selector: 'app-task-done',
  templateUrl: './task-done.component.html',
  styleUrls: ['./task-done.component.css']
})
export class TaskDoneComponent {
  tarefasConcluidas: any[] = [];
  user: userModel = new userModel();

  constructor(private http: HttpClient, 
  private modalService: NgbModal,
  private listTaskDoneService: ListTaskDoneService,
  private listTaskByUser:ListTaskByUserService) {}
    
    ngOnInit() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
      if (this.tarefasConcluidas.length === 0 && this.user.id) {
       this.listTaskByUser.listTaskByUserId(this.user.id).subscribe(
          (response) => {
            if (response && response.value && Array.isArray(response.value)) {
              this.tarefasConcluidas = response.value.filter((task: any) => task.done);
              console.log('Tarefas concluídas:', this.tarefasConcluidas);
            } else {
              console.error('Resposta do servidor inválida:', response);
            }
          },
          (error) => {
            console.error('Erro ao listar as tarefas:', error);
          }
        );
      }
    }
       
    openCreateTaskModal() {
      const modalRef = this.modalService.open(CreateTaskComponent);
    }

  openConfirmationModal(taskId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.taskId = taskId;
  }
 
}
