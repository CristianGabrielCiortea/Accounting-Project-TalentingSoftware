import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

import { WorkEntry } from '../models/publictypes';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcelPayments(jsonData: any[], fileName: string): void {
    const flattenedData = this.flattenJsonForPaid(jsonData);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}.xlsx`;
    link.click();
  }
  exportToExcelWorksNotPaid(jsonData: any[], fileName: string): void {
    const flattenedData2 = this.flattenJsonforUnpaid(jsonData);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData2);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}.xlsx`;
    link.click();
  }

  private flattenJsonForPaid(jsonData: any[]): any[] {
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
  private flattenJsonforUnpaid(jsonData: any[]): any[] {
    let flattenedData2: any[] = [];

    jsonData.forEach(item => {
      item.workEntries.forEach((work: WorkEntry) => {
        const flattenedItem2 = {
          name: item.name,
          hourlyRate: item.hourlyRate,
          total: item.total,
          date: work.date,
          taskHourly: work.taskHourly,
          hoursWorked: work.hoursWorked,
          taskSpecial: work.taskSpecial,
          forPay: work.payable,


        };

        flattenedData2.push(flattenedItem2);
      });
    });

    return flattenedData2;
  }

}


