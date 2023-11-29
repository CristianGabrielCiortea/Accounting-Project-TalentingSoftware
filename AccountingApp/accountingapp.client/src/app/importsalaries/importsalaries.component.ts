import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/publictypes';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-importsalaries',
  templateUrl: './importsalaries.component.html',
  styleUrls: ['./importsalaries.component.css']
})
export class ImportsalariesComponent implements OnInit {
  employees?: Employee[];
  isImported = false;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployers().subscribe(
      {
        next: (data: Employee[]) => { this.employees = data; },
        error: (error: any) => { console.log(error); }
      });
  }
  onImported(isImported: boolean) {
    this.isImported = isImported;
  }

  paySalaries() {
    alert('To do: Pay Salaries');
  }
}
