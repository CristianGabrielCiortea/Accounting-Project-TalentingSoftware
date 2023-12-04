import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Employee, WorkEntry } from './../../models/publictypes';
import * as XLSX from 'xlsx'
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})

export class UploadExcelComponent {

  constructor(private datepipe: DatePipe,
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
    private taskService: TaskService) { }
  jsonData: Employee[] = [];
  jsonForPay: Employee[] = [];
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
          this.jsonData.push({ 'name': data[i][0], 'hourlyRate': data[i][1], 'workEntries': [], 'total': 0 })
        }


        for (let i = 1; i < data.length; i++) {
          for (let j = 2; j < data[2].length; j += 2) {
            if (data[3][j] == 'Hrs' && data[i][j + 1] != undefined && data[i][j + 1] != 'Off') {
              this.jsonData[i - 1].workEntries?.push({ 'id': 0, 'date': data[2][j], 'hoursWorked': data[i][j]||0, 'taskHourly': data[i][j + 1] ,'isCheckedForPay':false})
            } else if (data[3][j] == '$' && data[i][j + 1] != undefined && data[i][j + 1] != 'Off') {
              this.jsonData[i - 1].workEntries?.push({ 'id': 0, 'date': data[2][j], 'payable': data[i][j] || 0, 'taskSpecial': data[i][j + 1], 'isCheckedForPay':false })
            }
          }

        }

        this.jsonData = this.jsonData.filter(element => {
          return element.name !== undefined && element.name != 'Name';
        });
        this.jsonData = this.jsonData.filter(element => {
          return element.workEntries.length > 0;
        });

        this.jsonData.forEach(empl => {
          this.updateEmployee(empl);
        });
        this.jsonData.forEach(empl => {
          empl.workEntries.forEach(work => {
            this.updateTasks(work);
          });

        });

        this.salaryService.updateSalaryData(this.jsonData);
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
      header[i] = this.datepipe.transform(header[i], 'dd/MM/yyyy', '+2400')
    }
  }

  markAsDone(workEntry: WorkEntry): void {
    workEntry.isCompleted = true;
    this.salaryService.updateSalaryData(this.jsonData);
  }

  updateEmployee(employee: Employee) {

    this.employeeService.getEmployeeIdByName(employee.name as string).subscribe(
      (id: number | undefined) => {
        employee.id = id;
      },
      error => {
        console.error('Error fetching employee ID:', error);
      }
    );
  }

  updateTasks(work: WorkEntry) {
    let workName = work.taskHourly ?? work.taskSpecial;
    this.taskService.getTaskIdByName(workName as string).subscribe(
      (id) => {
        work.id = id;
      },
      error => {
        console.error('Error fetching employee ID:', error);
      }
    );
  }

  onCheckAll(empl: Employee) {

    empl.isCheckedAll = !empl.isCheckedAll;
    if (empl.isCheckedAll == true) {
      empl.total = 0
      empl.workEntries.forEach(work => {
        if (work.id) {
          work.isCheckedForPay = true;
        }

        empl.total = this.calculateTotal(empl, work)
      });
    } else {
      empl.workEntries.forEach(work => {
        if (work.id) {
          work.isCheckedForPay = false;
        }

        empl.total = this.calculateTotal(empl, work)
      });
    }


  }
  onWorkCheckChange(empl: Employee, work: WorkEntry) {
    let index=this.jsonData.findIndex(employee=>employee.id==empl.id)
    let i=this.jsonData[index].workEntries.findIndex(w=>w.id==work.id&&w.date==work.date)
    if (work.isCheckedForPay == false) {

      this.jsonData[index].workEntries[i].isCheckedForPay = true;
      let count = 0;
      this.jsonData[index].workEntries.forEach(work => {
        if (work.isCheckedForPay == true) {
          count++
        }
        if (count == empl.workEntries.length) {
          this.jsonData[index].isCheckedAll = true;
        }
      });

      this.jsonData[index].total = this.addToTotal(empl, work);
    } else {
      this.jsonData[index].workEntries[i].isCheckedForPay= false;
      this.jsonData[index].isCheckedAll = false;
      this.jsonData[index].total = this.substractFromTotal(empl, work);
    }
  }

  calculateTotal(empl: Employee, work: WorkEntry): number {
    if (work.isCheckedForPay == true) {
      empl.total = this.addToTotal(empl, work);
    } else {
      empl.total = this.substractFromTotal(empl, work)
    }


    return empl.total;
  }

  addToTotal(empl: Employee, work: WorkEntry) {
    let total = empl.total;
    if (work.taskHourly && work.isCheckedForPay == true) {
      total += (work.hoursWorked as number) * (empl.hourlyRate as number);
    } else {
      if (work.taskSpecial && work.isCheckedForPay == true) {
        total += work.payable as number;
      }
    }
    return total;
  }

  substractFromTotal(empl: Employee, work: WorkEntry) {
    let total = empl.total;
    if (work.taskHourly && work.isCheckedForPay == false) {
      total -= work.hoursWorked as number * (empl.hourlyRate as number);
    } else {
      if (work.taskSpecial && work.isCheckedForPay == false) {
        total -= work.payable as number;
      }
    }
    return total;
  }

  SendForPayment(empl: Employee, works: WorkEntry[]) {
    let index = this.jsonData.findIndex(employee => employee.id == empl.id);

    let worksForPay = works.filter(work => work.isCheckedForPay == true);
     let i = this.jsonForPay.findIndex(employee => employee.id == empl.id);
    if (i < 0) {
      this.jsonForPay.push({'id':empl.id,
                          'name':empl.name,
                          'hourlyRate':empl.hourlyRate,
                          'workEntries': worksForPay,
                          'total':empl.total,
                          'isCheckedAll':empl.isCheckedAll});
    } else {
      this.jsonForPay[i].total+=empl.total;
      worksForPay.forEach(work => {
        if (work.taskHourly != undefined) {
          this.jsonForPay[i].workEntries.push({
            'id': work.id,
            'date': work.date,
            'hoursWorked': work.hoursWorked,
            'taskHourly': work.taskHourly,
            'isCheckedForPay': work.isCheckedForPay
          });
        } else {
          this.jsonForPay[i].workEntries.push({
            'id': work.id,
            'date': work.date,
            'payable': work.payable,
            'taskSpecial': work.taskSpecial,
            'isCheckedForPay': work.isCheckedForPay
          });
        }
      });
    }
    this.jsonData[index].workEntries = this.jsonData[index].workEntries.filter(work => work.isCheckedForPay == false)
    this.jsonData = this.jsonData.filter(empl => empl.workEntries.length > 0);
    console.log(this.jsonData);
    console.log(this.jsonForPay)
  }

}




