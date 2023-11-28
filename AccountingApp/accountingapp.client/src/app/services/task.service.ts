import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7095';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/Projects/GetAll`);
  }
}
