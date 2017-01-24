export class Conference {
    constructor(
        public Id: number,
        public Room: Select,
        public title: string,
        public start: string,
        public end: string,
        public allDay: boolean,
        public color: string,
    ) { }
}
interface Select {
    id: number;
    Name: string;
    Color: string;
};
