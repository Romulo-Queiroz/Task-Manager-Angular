import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ListTaskDoneService } from '../Services/list-task-done.service';

@Component({
  selector: 'app-task-done',
  templateUrl: './task-done.component.html',
  styleUrls: ['./task-done.component.css']
})
export class TaskDoneComponent {
  constructor(private http: HttpClient, private modalService: NgbModal,private listTaskDoneService: ListTaskDoneService) {}
    
    ngOnInit() {
      if (this.tarefasConcluidas.length === 0) {
        this.listTaskDoneService.listTaskDone().subscribe(
          response => {
            this.tarefasConcluidas = response;
          },
          error => {
            console.error('Erro ao obter as tarefas concluídas:', error);
          }
        );
      }
    }
    tarefasConcluidas: any[] = [];

    openCreateTaskModal() {
      const modalRef = this.modalService.open(CreateTaskComponent);
    }

  openConfirmationModal(taskId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.taskId = taskId;
  }
 
}
