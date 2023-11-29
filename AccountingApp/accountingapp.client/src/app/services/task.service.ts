import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employer, Project, Task } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}api/tasks/GetAll`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}api/projects/GetAll`);
  }

  getEmployees(): Observable<Employer[]> {
    return this.http.get<Employer[]>(`${this.baseUrl}api/employees/GetAll`);
  }
}
