import { Component } from '@angular/core';

@Component({
  selector: 'app-sucess-modal',
  templateUrl: './sucess-modal.component.html',
  styleUrls: ['./sucess-modal.component.css']
})
export class SucessModalComponent {
  isOpen = false;

  openModal() {
    this.isOpen = true;
    console.log('Modal aberta');
  }
}
