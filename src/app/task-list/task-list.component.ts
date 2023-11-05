import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { ListTaskTodoService } from '../../Services/list-task-todo.service';
import { MarkTaskAsUndoneService } from '../../Services/mark-task-done.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasksToDo: any[] = [];
  tarefasPorPagina = 6;
  currentPage = 1;
  totalPages = this.tasksToDo.length;
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private listTaskTodoService: ListTaskTodoService,
    private markTaskAsUndoneService: MarkTaskAsUndoneService
  ) {}

  ngOnInit() {
    this.listTaskTodoService.listTasktodo().subscribe(
      (response) => {
        this.tasksToDo = response;
      },
      (error) => {
        console.error('Erro ao obter as tarefas concluídas:', error);
      }
    );
  }

  openCreateTaskModal() {
    const modalRef = this.modalService.open(CreateTaskComponent);
  }

  openConfirmationModal(taskId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.taskId = taskId;
  }

  openUpdateTaskModal(taskId: number) {
    const modalRef = this.modalService.open(UpdateTodoComponent);
    modalRef.componentInstance.taskId = taskId;
  }

  markTaskAsUndone(taskId: number) {
    this.markTaskAsUndoneService.markTaskAsDone(taskId).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao marcar a tarefa como concluída:', error);
      }
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
