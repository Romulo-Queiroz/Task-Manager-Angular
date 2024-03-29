import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UpdateCreateTasksService} from '../../Services/update-create-tasks.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private modalService: NgbModal, private updateCreateTasksService:UpdateCreateTasksService) {
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskCategory: ['', Validators.required],
    });
    var user = localStorage.getItem('user');
    if (user !== null) {
      user = JSON.parse(user);
      console.log("Em create-task.component.ts: tenho user = ", user);
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  createTask() {
    if (this.taskForm.invalid) {
      return;
    }
    const newTask = {
      Title: this.taskForm.value.taskTitle,
      Description: this.taskForm.value.taskDescription,
      CategorieTaskId: this.taskForm.value.taskCategory
    };

    this.updateCreateTasksService.createTask(newTask).subscribe(
      (response) => {
        if(response){
          this.modalService.dismissAll();
          this.closeModal();
        }else {
          console.error('Erro ao criar a tarefa:', response);
        }
      },
      (error) => {
        console.error('Erro ao criar a tarefa:', error);
      }
    );
  }

}
