import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employer } from './employer';
import { EmployerService } from './employer.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employers: Employer[] | undefined;

  constructor(private employerService: EmployerService) { }

  ngOnInit(): void {
    this.getEmployers();
  }

  getEmployers(): void {
    this.employerService.getEmployers()
      .subscribe(employers => this.employers = employers);
  }

  title = 'accountingapp.client';
}
