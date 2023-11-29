import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/publictypes';

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
}
