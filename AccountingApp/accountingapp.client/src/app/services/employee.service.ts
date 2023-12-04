import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../models/publictypes';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}api/employees/GetAll`);
  }
  getEmployeeIdByName(name: string): Observable<number | undefined> {
    return this.getEmployees().pipe(
      map(employees => {
        const employee = employees.find(e => e.name === name);
        return employee ? employee.id : undefined;
      })
    );
  }
}
