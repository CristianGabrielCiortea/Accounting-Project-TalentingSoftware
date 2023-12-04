import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Employee, WorkEntry } from '../models/publictypes';
import { TaskService } from './task.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datepipe: DatePipe, private taskService:TaskService, private employeeService:EmployeeService) { }

jsonPaidWorkEntries:Employee[]=[];
jsonUnpaidWorkEntries:Employee[]=[];





public updateData(newData: any[], newForPay: any[]): void {
    this.jsonPaidWorkEntries = newForPay;
    this.jsonUnpaidWorkEntries = newData;

  }
}
