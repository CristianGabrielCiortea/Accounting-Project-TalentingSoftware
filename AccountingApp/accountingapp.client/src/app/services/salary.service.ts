import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee, WorkEntry } from '../models/publictypes';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  constructor() { }

  updateSalaryData(employees: Employee[]): void {
    this.employeesSubject.next(employees);
  }

  getSalaryData(): Observable<Employee[]> {
    return this.employees$;
  }
}
