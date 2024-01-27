import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userModel } from 'src/Models/user.model';
<<<<<<< HEAD
import { AsignTaskService } from 'src/Services/asign-task.service';
=======
import { AsignTaskByUserService } from 'src/Services/asign-task-by-user.service';
>>>>>>> refactor
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
    private listarUsuarios: ListUsersService,
<<<<<<< HEAD
    private asignTaskService: AsignTaskService
=======
    private  asignTaskByUserService: AsignTaskByUserService
>>>>>>> refactor
  ) { 
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskCategory: ['', Validators.required],
      taskUser: ['', Validators.required],
    });
  }

   ngOnInit() {
    this.listarUsuarios.listUsers().subscribe((data:any) => {
      this.users = JSON.parse(JSON.stringify(data.value));
    });
  }

  onSubmit() {
    const newTask = {
      Title: this.taskForm.value.taskTitle,
      Description: this.taskForm.value.taskDescription,
      CategorieTaskId: this.taskForm.value.taskCategory,
      UserId: this.taskForm.value.taskUser,
    };

    this.asignTaskService.createTask(newTask).subscribe(
      (response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.closeModal();
      },
      (error) => {
        console.log(error);
      }
    );
    this.modalService.dismissAll();
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  asignTAsk() {

    const newTask = {
      Title: this.taskForm.value.taskTitle,
      Description: this.taskForm.value.taskDescription,
      Done: false,
      CreatedAt: new Date(),
      CategorieTaskId: this.taskForm.value.taskCategory,
      UserId: this.taskForm.value.taskUser
    };

    this.asignTaskByUserService.asignTaskToUser(newTask).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.closeModal();
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    )
    
  }
}
