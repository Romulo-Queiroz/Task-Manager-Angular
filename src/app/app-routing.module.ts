import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { AuthGuard } from 'AuthGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { 
    path: 'tasks', 
    component: TaskListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'task-done', 
    component: TaskDoneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
