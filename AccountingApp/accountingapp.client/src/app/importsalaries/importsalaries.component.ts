import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, TaskDetail, WorkEntry } from '../models/publictypes';
import { EmployeeService } from '../services/employee.service';
import { SalaryService } from '../services/salary.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-importsalaries',
  templateUrl: './importsalaries.component.html',
  styleUrls: ['./importsalaries.component.css']
})
export class ImportsalariesComponent implements OnInit {
  employees?: Employee[];
  isImported = false;
  areSalariesPaid = false;
  constructor(private employeeService: EmployeeService,
    private taskService: TaskService,
    private datepipe: DatePipe,
    private salaryService: SalaryService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (data: Employee[]) => { this.employees = data; },
        error: (error: any) => { console.log(error); }
      });
  }

  onImported(isImported: boolean) {
    this.isImported = isImported;

    if (this.isImported) {
      this.salaryService.getSalaryData().subscribe(
        {
          next: (data: Employee[]) => { this.employees = data; },
          error: (error: any) => { console.log(error); }
        });
    }
  }

  paySalaries() {
    if (this.employees && this.isImported) {
      this.updateTasks(this.employees)
      this.areSalariesPaid = true;
    }
  }

  public updateTasks(employees: Employee[]): void {
    employees.forEach((employee: Employee) => {
      if (employee.workEntries && employee.workEntries.length > 0) {
        employee.workEntries.forEach((workEntry) => {
          this.processWorkEntry(employee, workEntry);
        });
      }
    });
  }

  private processWorkEntry(employee: Employee, workEntry: WorkEntry): void {
    const taskName = workEntry.taskHourly ?? workEntry.taskSpecial;

    if (taskName === undefined) {
      console.error('Task name is undefined');
      return;
    }

    this.taskService.getTaskIdByName(taskName).subscribe(
      (taskId) => {
        console.log('Fetched taskId successfully:', taskId);
        this.addTaskDetail(employee, workEntry, taskId);
      },
      (error) => {
        console.error('Error fetching taskId', error);
      }
    );
  }

  private addTaskDetail(employee: Employee, workEntry: WorkEntry, taskId: number): void {
    const transformedDate = this.datepipe.transform(workEntry.date, 'yyyy-dd-MMTHH:mm:ss.sss');
    const dateAsDate: Date | undefined = transformedDate ? new Date(transformedDate) : undefined;

    const taskDetail: TaskDetail = {
      id: 0,
      taskId: taskId,
      employeeId: employee.id,
      date: dateAsDate,
      isCompleted: workEntry.isCompleted,
      workedHours: workEntry.hoursWorked,
    };

    this.taskService.addTaskDetails(taskDetail).subscribe(
      () => {
        console.log('Task detail added successfully:', taskDetail);
      },
      (error) => {
        console.error('Error adding task detail', error);
      }
    );
  }
}
