import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Employee, Task, TaskDetail } from './../../models/publictypes';
import * as XLSX from 'xlsx'
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})

export class UploadExcelComponent {
  constructor(private datepipe: DatePipe,
    private taskService: TaskService) { }
  jsonData: Employee[] = []
  isImported = false;
  @Output() IsImported = new EventEmitter<boolean>();

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length > 1) {
      this.isImported = false;
      alert('Multiple files are not allowed');
      return;
    }
    else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });
        const wsname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        delete (data[0]);

        this.fillEmptyCells(data[1]);
        this.fillEmptyCells(data[2]);
        this.setDates(data[2]);
        let id = 1;

        for (let i = 1; i < data.length; i++) {
          this.jsonData.push({ id: id++, 'name': data[i][0], 'hourlyRate': data[i][1], 'workEntries': [] })
        }

        for (let i = 1; i < data.length; i++) {
          for (let j = 2; j < data[2].length; j += 2) {
            if (data[3][j] == 'Hrs' && data[i][j + 1] != undefined && data[i][j + 1] != 'Off') {
              this.jsonData[i - 1].workEntries?.push({ 'date': data[2][j], 'hoursWorked': data[i][j], 'taskHourly': data[i][j + 1] })
            } else if (data[3][j] == '$' && data[i][j + 1] != undefined && data[i][j + 1] != 'Off') {
              this.jsonData[i - 1].workEntries?.push({ 'date': data[2][j], 'payable': data[i][j] || 0, 'taskSpecial': data[i][j + 1] })
            }
          }

        }

        this.jsonData = this.jsonData.filter(element => {
          return element.name !== undefined && element.name != 'Name';
        });

        this.updateTasks();
      }
      reader.readAsBinaryString(target.files[0]);
      this.isImported = true;
      this.IsImported.emit(true);
    }
  }

  fillEmptyCells(header: any[]): any[] {
    for (let i = 1; i < header.length; i++) {
      if (header[i] == null) {
        header[i] = header[i - 1];
      }
      if (header.length % 2 == 1) {
        header.push(header[header.length])
      }
    }
    return header;
  }

  setDates(header: any[]) {
    for (let i = 1; i < header.length; i++) {
      header[i] = this.datepipe.transform(header[i], "dd/MM/yyy")
    }
  }

  public updateTasks(): void {
    this.jsonData.forEach((employee: Employee) => {
      if (employee.workEntries && employee.workEntries.length > 0) {
        employee.workEntries.forEach((workEntry) => {
          const taskName = workEntry.taskHourly ? workEntry.taskHourly : workEntry.taskSpecial;

          if (taskName !== undefined) {
            this.taskService.getTaskIdByName(taskName).subscribe(
              (taskId) => {
                console.log('Fetched taskId successfully:', taskId);

                const transformedDate = this.datepipe.transform(workEntry.date, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
                const dateAsDate: Date | undefined = transformedDate ? new Date(transformedDate) : undefined;

                const taskDetail: TaskDetail = {
                  id: 0,
                  taskId: taskId,
                  employeeId: employee.id,
                  date: dateAsDate,
                  isCompleted: false,
                  workedHours: workEntry.hoursWorked,
                };

                this.taskService.addTaskDetails(taskDetail).subscribe(
                  () => {
                    console.log('Task detail added successfully:', taskDetail);
                  },
                  (error) => {
                    console.error('Error adding task detail', error);
                  }
                );
              },
              (error) => {
                console.error('Error fetching taskId', error);
              }
            );
          } else {
            console.error('Task name is undefined');
          }
        });
      }
    });
  }


}




