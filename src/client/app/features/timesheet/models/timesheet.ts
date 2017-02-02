/** Timesheet Model Definition */
export interface Timesheet {
    id:number;
    employeeName:string;
    project:string;
    date:string;
    task:string;
    billableHours:number;
    nonBillableHours:number;
    status:string;
    totalHours:number;
    noteBillableHours:string;
    noteNonBillableHours:string;
}
