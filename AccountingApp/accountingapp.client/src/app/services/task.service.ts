import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, Project, Task } from '../models/publictypes';
import { map, Observable } from 'rxjs';
import { Task, TaskDetail, TaskInfoAll } from '../models/publictypes';

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

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}api/employees/GetAll`);
  }

  addTaskDetails(taskDetail: TaskDetail): Observable<TaskDetail> {
    return this.http.post<TaskDetail>(`${this.baseUrl}api/tasks/AddDetails`, taskDetail);
  }

  getTaskIdByName(name: string): Observable<number> {
    return this.http.get<Task>(`${this.baseUrl}api/tasks/GetByName/${name}`).pipe(
      map((task: Task) => task.id || 0)
    );
  }
}
