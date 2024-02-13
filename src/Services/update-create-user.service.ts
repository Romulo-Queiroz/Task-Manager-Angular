import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "./enviroment";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class UpdateCreateUsersService {
 
  constructor(private http: HttpClient,private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }
  createUser(newUser: any): Observable<any> {

    console.log("Minha senha vindo do componente"+ newUser.password);
    const newUserModel = {
      userName: newUser.userName,
      password: newUser.password
    };
    
    const url = `${environment.apiBaseUrl}/api/login/CreateAccount`;
  
    console.log("Meu user model"+newUserModel.password);
    console.log("Meu user model"+newUserModel.userName);
    return this.http.post(url, newUserModel).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}