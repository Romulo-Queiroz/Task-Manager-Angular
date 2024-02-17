import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { ListTaskTodoService } from '../../Services/list-task-todo.service';
import { MarkTaskAsUndoneService } from '../../Services/mark-task-done.service';
import { ListTaskByUserService } from 'src/Services/list-task-by-user.service';
import { userModel } from 'src/Models/user.model';

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
  user : userModel = new userModel();

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private listTaskTodoService: ListTaskTodoService,
    private markTaskAsUndoneService: MarkTaskAsUndoneService,
    private listTaskByUser: ListTaskByUserService,
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
    if (this.tasksToDo.length === 0 && this.user.id) {
     this.listTaskByUser.listTaskByUserId(this.user.id).subscribe(
        (response) => {
          if (response && response.value && Array.isArray(response.value)) {
            this.tasksToDo = response.value.filter((task) => !task.done);
            console.log('Tarefas:', this.tasksToDo);
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

  openUpdateTaskModal(taskId: number) {
    const modalRef = this.modalService.open(UpdateTodoComponent);
    modalRef.componentInstance.taskId = taskId;
  }

  markTaskAsUndone(taskId: number) {
    this.markTaskAsUndoneService.markTaskAsDone(taskId).subscribe(
      (response) => {
        this.ngOnInit();
        window.location.reload();
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
