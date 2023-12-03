import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { ImportsalariesComponent } from './importsalaries/importsalaries.component';

import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentPipe } from './pipes/payment.pipe';
import { UploadExcelComponent } from './importsalaries/upload-excel/upload-excel.component';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { PopupComponent } from './popup/popup.component';
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    TaskdetailsComponent,
    ImportsalariesComponent,
    UploadExcelComponent,
    HomeComponent,
    PaymentPipe,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
      { path: 'task-details', component: TaskdetailsComponent, pathMatch: 'full' },
      { path: 'import-salaries', component: ImportsalariesComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    DatePipe
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
