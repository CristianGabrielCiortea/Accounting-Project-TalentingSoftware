import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getEmployers(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}api/employees/GetAll`);
  }
}
