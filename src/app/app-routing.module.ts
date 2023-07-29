import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDoneComponent } from './task-done/task-done.component';

const routes: Routes = [
  // ... outras rotas ...,
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent }, // Verifique se está definida corretamente.
  { path: 'task-done', component: TaskDoneComponent },
  // ... outras rotas ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
