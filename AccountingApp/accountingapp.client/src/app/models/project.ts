import { Task } from "./task";

export interface Project {
  Id:number,
  Name:string,
  InitialBudget:number;
  SpentBudget:number;
  Tasks:Task[]
}
