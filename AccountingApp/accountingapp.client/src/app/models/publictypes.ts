export class Employee {
  id: number | undefined;
  name: string | undefined;
  hourlyRate: number | undefined;
  workEntries?: WorkEntry[] | undefined;
}

export class Project {
  id: number | undefined;
  name: string | undefined;
  paymentType: PaymentType | string | undefined;
  initialBudget: number | undefined;
  tasks: Task[] | undefined;
  totalSpent: number | undefined;
  remainingBudget: number | undefined;
  totalHours: number | undefined;
  nrOfTasks: number | undefined;
}

export class Task {
  id: number | undefined;
  projectId: number | undefined;
  name: string | undefined;
  taskDetails: TaskDetail[] | undefined;
  fixedPrice: number | undefined;
}

export class TaskDetail {
  id: number | undefined;
  taskId: number | undefined;
  employeeId: number | undefined;
  date: Date | undefined;
  isCompleted: boolean | undefined = false;
  workedHours: number | undefined;
}
export enum PaymentType { "Hourly", "FixedPrice" }

export class WorkEntry {
  date?: string;
  hoursWorked?: number;
  taskHourly?: string;
  payable?: number;
  taskSpecial?: string;
}

export class TaskInfoAll {
  project: Project | undefined;
  task: Task | undefined;
  taskDetails: TaskDetail[] | undefined;
  employee: Employee | undefined;
}
