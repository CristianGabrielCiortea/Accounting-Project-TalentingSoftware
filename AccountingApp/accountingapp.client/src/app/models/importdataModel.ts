
export interface WorkEntry {
  date: string;
  hoursWorked?: number;
  taskHourly?: string;
  payable?: number;
  taskSpecial?: string;
}

export interface Employee {
  name: string;
  hourlyRate: number;
  workEntries: WorkEntry[];
}
