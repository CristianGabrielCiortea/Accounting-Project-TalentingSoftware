import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PaymentType, Project, Task } from '../models/publictypes';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public selectedProject: Project | undefined;
  public selectedTask: Task | undefined;
  @ViewChild('ctlTaskName') ctlTaskName: HTMLInputElement | undefined;
  constructor(private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.projectService.getProjects()
      .subscribe(
        {
          next: (result) => this.projects = result,
          error: (error) => console.error(error)
        }
      );
  }
  public selectProject(project?: Project): void {
    if (project == null) {
      this.selectedProject = new Project();
      this.selectedProject.id = ((this.projects.length ?? 0) + 1) * -1;
      this.selectedProject.paymentType = "Hourly";
      this.selectedProject.tasks = [];
    }
    else
      this.selectedProject = { ...project };
  }

  public deleteProject(project: Project | undefined): void {
    if (project == null) return;
    this.projectService.deleteProject(project)
      .subscribe(
        {
          next: (result) => this.getData(),
          error: (error) => console.error(error)
        }
      );
  }

  public addProject(project: Project | undefined): void {
    if (project == null) return;
    this.projectService.addProject(project)
      .subscribe(
        {
          next: (result) => this.getData(),
          error: (error) => console.error(error)
        }
      );
  }
  public editProject(project?: Project | undefined): void {
    if (project == null) return;
    this.projectService.updateProject(project)
      .subscribe(
        {
          next: (result) => this.getData(),
          error: (error) => console.error(error)
        }
      );
  }

  public cleanProject(): void {
    this.selectedProject = undefined;
    this.selectedTask = undefined;
  }

  onSaveProjectForm(form: any) {
    if (form.valid) {
      if ((this.selectedProject?.id ?? 0) <= 0) {
        this.addProject(this.selectedProject);
      }
      else {
        this.editProject(this.selectedProject);
      }
      this.selectedTask = undefined;
      this.selectedProject = undefined;
    }
  }

  public addTask(project?: Project, task?: Task): void {
    if (project == null || task == null) return;

    let existingTask = project.tasks?.find(t => t.id == task.id);
    if (existingTask != null) {
      existingTask.name = task.name;
      existingTask.fixedPrice = task.fixedPrice;
    }
    else
      project.tasks?.push(task);
    this.selectedTask = undefined;
  }
  public removeTask(project?: Project, task?: Task): void {
    if (project == null || task == null) return;
    project.tasks = project.tasks?.filter(t => t.id !== task.id);
  }

  public selectTask(project?: Project, task?: Task): void {
    if (task == null) {
      this.selectedTask = new Task();
      this.selectedTask.id = ((project?.tasks?.length ?? 0) + 1) * -1;
      this.selectedTask.projectId = project?.id;
    }
    else
      this.selectedTask = { ...task };

  }
  public cancelTaskEdit(project?: Project, task?: Task): void {
    if (project == null || task == null) return;
    this.selectedTask = undefined;
  }
}
