import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {
  taskForm: FormGroup;
  tarefa: any;
  taskId!: number;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }
  
  closeModal() {
    this.modalService.dismissAll();
  }

updateTask() {
  const updatedTask = this.taskForm.value;
  const taskToUpdate = {
    title: updatedTask.taskTitle, 
    description: updatedTask.taskDescription, 
    done: updatedTask.done
  };
  this.http.put<any>(`http://localhost:5021/change/${this.taskId}`, taskToUpdate).subscribe(
    response => {
      this.tarefa = {
        title: response.title,
        description: response.description,
        done: response.done,
        createdAt: response.createdAt
      };
      
      this.modalService.dismissAll();
    },
    error => {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  );
}
  
}
