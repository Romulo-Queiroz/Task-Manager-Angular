import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { AuthGuard } from 'AuthGuard';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [

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
  },
  {
    path:'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
