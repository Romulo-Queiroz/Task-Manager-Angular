import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Chart } from 'chart.js/auto';
import { ListAllTasksService } from 'src/Services/list-all-tasks.service';
import { TodoModel } from 'src/Models/Todo.model';
import { ListTaskDoneService } from 'src/Services/list-task-done.service';
import { ListTaskTodoService } from 'src/Services/list-task-todo.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  constructor(
    private listAllTasksService: ListAllTasksService,
    private listTaskDoneService: ListTaskDoneService,
    private listTaskTodoService: ListTaskTodoService,
    ) { }

  public allTasks:TodoModel[] = [];
  public tasksDone:TodoModel[] = [];
  public tasksTodo:TodoModel[] = [];

  ngOnInit(): void {
    forkJoin([
      this.listAllTasksService.listAllTasks(),
      this.listTaskDoneService.listTaskDone(),
      this.listTaskTodoService.listTasktodo()
    ]).subscribe(([allTasksData, tasksDoneData, tasksTodoData]) => {
      this.allTasks = allTasksData.length;
      this.tasksDone = tasksDoneData.length;
      this.tasksTodo = tasksTodoData.length;
  
      this.createChart();
      this.createChartBar();
    });
  }

  createChart() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Tarefas não concluídas', 'Tarefas concluídas', 'Total tarefas'],
      datasets: [{
        data: [this.tasksTodo, this.tasksDone,this.allTasks],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    }
  });
}

  createChartBar() {
    const ctx = document.getElementById('myChartBar') as HTMLCanvasElement;
    const myChartBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tarefas não concluídas', 'Tarefas concluídas', 'Total tarefas'],
        datasets: [{
          label: 'Dados',
          data: [this.tasksTodo, this.tasksDone,this.allTasks],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }
  
}
