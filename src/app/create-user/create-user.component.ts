import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCreateUsersService } from 'src/Services/update-create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  userForm: FormGroup;

  constructor(private modalService: NgbModal,
    private updateCreateUserService: UpdateCreateUsersService,
    private formBuilder: FormBuilder) {
        this.userForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required],
        });
     }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }
    const newUser = {
      userName: this.userForm.value.userName,
      password: this.userForm.value.password
    };
    this.updateCreateUserService.createUser(newUser).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.closeModal();
      },
      (error: any) => {
        console.log(error);
        this.modalService.dismissAll();
        this.closeModal();
      }
    );
  }

}
