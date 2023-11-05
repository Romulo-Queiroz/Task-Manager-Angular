import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DeleteTaskService } from '../Services/delete-task.service';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  taskId!: number;

  constructor(private activeModal: NgbActiveModal, 
    private http: HttpClient,
    private deleteTaskService:DeleteTaskService) {}

  closeModal() {
    this.activeModal.dismiss();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  deleteTask() {
    this.deleteTaskService.deleteTask(this.taskId).subscribe(
      (response) => {
        this.activeModal.close();
      },
      (error) => {
        console.error('Erro ao deletar a tarefa:', error);
      }
    );
  }
}
