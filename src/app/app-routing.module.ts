import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  //rota para login
  { path: 'login', component: LoginComponent },
  //rota inicial da aplicação
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  //rota para o componente CreateTaskComponent
  { path: 'tasks', component: TaskListComponent },
  //rota para o componente TaskListComponent
  { path: 'task-done', component: TaskDoneComponent },
  // outras rotas existentes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
