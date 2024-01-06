import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Chart } from 'chart.js/auto';
import { ListAllTasksService } from 'src/Services/list-all-tasks.service';
import { TodoModel } from 'src/Models/Todo.model';
import { ListTaskDoneService } from 'src/Services/list-task-done.service';
import { ListTaskTodoService } from 'src/Services/list-task-todo.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {

  constructor(
    private listAllTasksService: ListAllTasksService,
    private listTaskDoneService: ListTaskDoneService,
    private listTaskTodoService: ListTaskTodoService,
    ) { }

  public allTasks:TodoModel[] = [];
  public tasksDone:TodoModel[] = [];
  public tasksTodo:TodoModel[] = [];

  ngOnInit(): void {
    this.listAllTasksService.listAllTasks().subscribe(
      (response) => {
        if (response && response.value && Array.isArray(response.value)) {
          this.allTasks = response.value.length;
          this.updateChart();
        } else {
          console.error('Resposta do servidor inválida:', response);
        }
      },
      (error) => {
        console.error('Erro ao listar as tarefas:', error);
      }
    );
  
    this.listTaskDoneService.listTaskDone().subscribe(
      (response) => {
        if (response && response.value && Array.isArray(response.value)) {
          this.tasksDone = response.value.length;
          this.updateChart();
        } else {
          console.error('Resposta do servidor inválida:', response);
        }
      },
      (error) => {
        console.error('Erro ao listar as tarefas:', error);
      }
    );
  
    this.listTaskTodoService.listTasktodo().subscribe(
      (response) => {
        if (response && response.value && Array.isArray(response.value)) {
          this.tasksTodo = response.value.length;
          this.updateChart();
        } else {
          console.error('Resposta do servidor inválida:', response);
        }
      },
      (error) => {
        console.error('Erro ao listar as tarefas:', error);
      }
    );
  }
  
  updateChart() {
    if (this.allTasks !== undefined && this.tasksDone !== undefined && this.tasksTodo !== undefined) {
      this.destroyChart('myChart');
      this.createChart('myChart');
      this.destroyChart('myChartBar');
      this.createChartBar('myChartBar');
    }
  }
  
  destroyChart(chartId: string) {
    const existingChart = Chart.getChart(chartId);
    if (existingChart) {
      existingChart.destroy();
    }
  }
  
  createChart(canvasId: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Tarefas não concluídas', 'Tarefas concluídas', 'Total tarefas'],
        datasets: [{
          data: [this.tasksTodo, this.tasksDone, this.allTasks],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }
  
  createChartBar(canvasId: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    const myChartBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tarefas não concluídas', 'Tarefas concluídas', 'Total tarefas'],
        datasets: [{
          label: 'Tarefas não concluídas',
          data: [this.tasksTodo, this.tasksDone, this.allTasks],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }
}  
