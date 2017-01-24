export class Ticket {
    constructor(
        public Id:number,
        public ticket:string,
        public Department:string,
        public Concern:string,
        public Description:string,
        public Status:string,
        public Priority:string,
        public CreatedDate:string,
        public UpdatedDate:string,
        public UpdatedBy:string,
        public ResolvedBy:string,
        public AgeDays:string,
    ) { }
}
