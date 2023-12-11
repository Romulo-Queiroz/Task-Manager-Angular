import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDoneComponent } from './task-done/task-done.component';
import { AuthGuard } from 'AuthGuard';
import { DashboardPageComponent } from './dashbard/dashboard-page.component';
import { AdministracaoComponent } from './administracao/administracao.component';

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
    path:'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'administracao',
    component: AdministracaoComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
