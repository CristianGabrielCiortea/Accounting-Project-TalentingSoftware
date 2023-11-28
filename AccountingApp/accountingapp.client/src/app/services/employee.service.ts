import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7095';

  constructor(private http: HttpClient) { }

  getEmployers(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/api/employees/GetAll`);
  }
}
