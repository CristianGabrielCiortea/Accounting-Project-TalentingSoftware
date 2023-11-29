import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employer } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getEmployers(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseUrl}/api/employees/GetAll`);
  }
}
