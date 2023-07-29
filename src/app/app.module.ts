import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { CreateTaskComponent } from './create-task/create-task.component';
import {  ReactiveFormsModule  } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TaskListComponent,
    CreateTaskComponent,
    ConfirmationModalComponent,
    UpdateTodoComponent,
    TaskDoneComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Importação do módulo HttpClientModule
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
