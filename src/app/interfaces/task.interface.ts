export interface Task {
    id?:number,
    email:string,
    title:string,
    description:string,
    date:Date,
    priority:number,
    project:string,
    completed:boolean,
    subtasks?:Task[]
}
