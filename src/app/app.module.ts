import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'AuthGuard';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { DashboardPageComponent } from './dashbard/dashboard-page.component';
import { AdministracaoComponent } from './administracao/administracao.component';

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
    DashboardPageComponent,
    AdministracaoComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('jwtToken');
        },
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/login/authenticate'],
      },
    }),
    RouterModule.forRoot([]),
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
