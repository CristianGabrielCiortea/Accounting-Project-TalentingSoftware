import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Employee, Project, Task } from '../models/publictypes';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {

  public startDate: Date | undefined;
  public endDate: Date | undefined;
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

  /*  getEmployeesWorkedHours(id: Number | undefined, date: Date | undefined) {
      const data = this.employees.find(n => n.id === id)?.workEntries;
      if (data !== undefined) {
        for (let i = 0; i < data?.length; i++) {
          if (data[i].date === date) {
            return data[i].hoursWorked;
          }
        }
      }
      return '-';
    }*/

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event && event.value) {
      const selectedDate = event.value;
      this.startDate = selectedDate;
    }
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event && event.value) {
      const selectedDate = event.value;
      this.endDate = selectedDate;
    }
  }

  convertToDate(value: string | Date | undefined): Date | undefined {
    if (!value) {
      return undefined;
    }
    return value instanceof Date ? value : new Date(value);
  }

  checkBetweenDates(dateToCheck: Date | undefined, startDate: Date | undefined, endDate: Date | undefined): boolean {
    if (!dateToCheck || !startDate || !endDate) {
      return false;
    }

    const formattedDateToCheck = new Date(dateToCheck.toDateString());
    const formattedStartDate = new Date(startDate.toDateString());
    const formattedEndDate = new Date(endDate.toDateString());

    return formattedDateToCheck >= formattedStartDate && formattedDateToCheck <= formattedEndDate;
  }
}


