import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskInfoAll } from '../models/publictypes';

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

  getTasksWithAllInfo(): Observable<TaskInfoAll[]> {
    return this.http.get<TaskInfoAll[]>(`${this.baseUrl}api/tasks/GetAllWithDetails`);
  }
}
