export class Task{
    constructor(
        public _id: string,
        public title: string,
        public text: string,
        public dueDate : Date,
        public status: string,
        public label : string,
    ){

    }
}
