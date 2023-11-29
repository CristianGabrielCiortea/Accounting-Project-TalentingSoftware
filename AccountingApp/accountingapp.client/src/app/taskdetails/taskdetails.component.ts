import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task, TaskInfoAll } from '../models/publictypes';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {

  public tasks: Task[] = [];
  public tasksAll: TaskInfoAll[] = [];
  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });

    //this.taskService.getTasksWithAllInfo().subscribe((data) => {
    //  this.tasksAll = data;
    //});
  }
}
