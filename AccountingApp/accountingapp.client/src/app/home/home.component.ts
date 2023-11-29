import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public downloadTemplate(): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'assets/template_excel.xlsx';
    downloadLink.download = 'template_excel.xlsx';
    document.body.appendChild(downloadLink);

    try {
      downloadLink.click();
      console.log('Download started successfully.');
    } catch (error) {
      console.error('Error starting download:', error);
    } finally {
      document.body.removeChild(downloadLink);
    }
  }

}
