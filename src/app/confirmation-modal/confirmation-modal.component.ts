import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  taskId!: number;

  constructor(private activeModal: NgbActiveModal, private http: HttpClient) {}

  closeModal() {
    this.activeModal.dismiss();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  deleteTask() {
    this.http.delete<any>(`http://localhost:5021/deletar/${this.taskId}`).subscribe(
      response => {
        console.log('Tarefa excluída com sucesso:', response);
        this.activeModal.close(this.taskId);
      },
      error => {
        console.error('Erro ao excluir a tarefa:', error);
      }
    );
  }
}
