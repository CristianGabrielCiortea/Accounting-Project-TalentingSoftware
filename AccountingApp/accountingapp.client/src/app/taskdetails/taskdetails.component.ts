import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Employee, Project, Task } from '../models/publictypes';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {

  public tasks: Task[] = [];

  public projects: Project[] = [];
  public employees: Employee[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
    this.taskService.getProjects().subscribe((data) => {
      this.projects = data;
    });
    this.taskService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  getEmployeesName(id: Number | undefined) {
    return this.employees.find(n => n.id === id)?.name;
  }
  getProjectName(id: Number | undefined) {
    return this.projects.find(n => n.id === id)?.name;
  }
}


