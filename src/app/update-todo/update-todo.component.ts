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
//edit task   
updateTask() {
  const updatedTask = this.taskForm.value;
  const taskToUpdate = {
    title: updatedTask.taskTitle, // Usando taskTitle em vez de title
    description: updatedTask.taskDescription, // Usando taskDescription em vez de description
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
      console.log('Tarefa atualizada com sucesso:', response);
    },
    error => {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  );
  console.log('Valor do id: ' + this.taskId);
}
  
}
