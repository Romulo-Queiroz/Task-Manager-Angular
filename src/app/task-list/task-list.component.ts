import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tarefasConcluidas: any[] = [];

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {}

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

  openCreateTaskModal() {
    const modalRef = this.modalService.open(CreateTaskComponent);
  }

  openConfirmationModal(taskId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.taskId = taskId;

    modalRef.result.then(
      result => {
        // Lógica a ser executada após fechar o modal, se necessário
        console.log('Modal fechado:', result);
      },
      reason => {
        // Lógica a ser executada se o modal for fechado por outro motivo, como o clique fora do modal
        console.log('Modal fechado por motivo:', reason);
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
