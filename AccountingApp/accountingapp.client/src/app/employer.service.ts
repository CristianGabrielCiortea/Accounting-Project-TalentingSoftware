import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employer } from './employer';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = 'https://localhost:7095';

  constructor(private http: HttpClient) { }

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.apiUrl}/api/employees/GetAll`);
  }
}
