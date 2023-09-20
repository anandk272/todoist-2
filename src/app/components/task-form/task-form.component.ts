import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  constructor(private dataServices:DataService){}
  @Input() toggle:boolean=false
  @Output() toggleChange:EventEmitter<boolean>=new EventEmitter()

  defaultTask:Task={
    title:'',
    description:'',
    date:new Date(),
    priority:4,
    project:''
  }

  task:Task={...this.defaultTask}
  resetTask(){
    this.task={...this.defaultTask}

  }
  handleClick(){
    console.log('handle click',this.task)
    this.task.date=new Date()
    this.dataServices.addTask(this.task)
    this.toggleChange.emit(!this.toggle)
    this.resetTask()
  

  }

}
