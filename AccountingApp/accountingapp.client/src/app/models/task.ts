
export interface Task {
  Id:number,
  ProjectId:number,
  EmployeeId:number,
  Name:string,
  PaymentType: TaskType,
  isCompleted:boolean,
  CompletedDate:Date,
  WorkedHours:number,
  TotalPrice:number,
  isPayed:boolean
}
enum TaskType{
  Hourly,
  Fixed
}
