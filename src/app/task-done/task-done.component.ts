import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-done',
  templateUrl: './task-done.component.html',
  styleUrls: ['./task-done.component.css']
})
export class TaskDoneComponent {
  constructor(private http: HttpClient, private modalService: NgbModal,
    ) {}
    
    ngOnInit() {
      if (this.tarefasConcluidas.length === 0) {
        this.http.get<any>('http://localhost:5021/home').subscribe(
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

    modalRef.result.then(
      result => {
        console.log('Modal fechado:', result);
      },
      reason => {
        console.log('Modal fechado por motivo:', reason);
      }
    );
  }

  openUpdateTaskModal(taskId: number) {
    this.http.get<any>(`http://localhost:5021/home/${taskId}`).subscribe(
      response => {
        const modalRef = this.modalService.open(UpdateTodoComponent);
        modalRef.componentInstance.taskId = taskId;
        modalRef.componentInstance.task = response;
      
        modalRef.result.then(
          result => {
          
            console.log('Modal fechado:', result);
          },
          reason => {
            console.log('Modal fechado por motivo:', reason);
          }
        );
      },
      error => {
        console.error('Erro ao obter os dados da tarefa:', error);
      }
    );
  }
    
  markTaskAsUndone(taskId: number) {
    this.http.put<any>(`http://localhost:5021/done/${taskId}`, { Done: false }).subscribe(
      response => {
        console.log('Tarefa atualizada com sucesso:', response);
        this.tarefasConcluidas = this.tarefasConcluidas.filter(tarefa => tarefa.id !== taskId);
      },
      error => {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    );
  }
 
}
