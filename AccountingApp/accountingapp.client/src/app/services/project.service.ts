import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}api/projects/GetAll`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}api/projects/Add`, project);
  }

  deleteProject(project: Project): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}api/projects/Delete?id=${project.id}`);
  }

updateProject(project: Project): Observable<Project> {
  return this.http.put<Project>(`${this.baseUrl}api/projects/Update`, project);
  }
}
