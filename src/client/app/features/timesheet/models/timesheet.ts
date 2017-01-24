/** Timesheet Model Definition */
export interface Timesheet {
    id;
    employeeName;
    project;
    date;
    task;
    billableHours;
    nonBillableHours;
    status;
    totalHours;
    noteBillableHours;
    noteNonBillableHours;
}
