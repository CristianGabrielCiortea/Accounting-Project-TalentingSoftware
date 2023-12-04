import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { WorkEntry } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcelPayments(jsonData: any[], fileName: string): void {
    const flattenedData = this.flattenJson(jsonData);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, `${fileName}.xlsx`);
  }
  exportToExcelWorksNotPaid(jsonData: any[], fileName: string): void {
    const flattenedData2 = this.flattenJson2(jsonData);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData2);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, `${fileName}.xlsx`);
  }

  private flattenJson(jsonData: any[]): any[] {
    let flattenedData: any[] = [];

    jsonData.forEach(item => {
      item.workEntries.forEach((work: WorkEntry) => {
        const flattenedItem = {
          Name: item.name,
          hourlyRate: item.hourlyRate,
          total: item.total,
          date: work.date,
          task: (work.taskHourly) ? work.taskHourly : work.taskSpecial,
          paid: (work.hoursWorked) ? work.hoursWorked * item.hourlyRate : work.payable,
        };

        flattenedData.push(flattenedItem);
      });
    });

    return flattenedData;
  }
  private flattenJson2(jsonData: any[]): any[] {
    let flattenedData2: any[] = [];

    jsonData.forEach(item => {
      item.workEntries.forEach((work: WorkEntry) => {
        const flattenedItem = {
          name: item.name,
          hourlyRate: item.hourlyRate,
          total: item.total,
          date: work.date,
          taskHourly: work.taskHourly,
          hoursWorked: work.hoursWorked,
          taskSpecial: work.taskSpecial,
          forPay: work.payable,


        };

        flattenedData2.push(flattenedItem);
      });
    });

    return flattenedData2;
  }

}


