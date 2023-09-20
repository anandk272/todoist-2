import { ImplicitReceiver } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges,OnInit{
  constructor(private dataServices:DataService,private authService:AuthService){}
  user:string=''
  today:Date=new Date()
  projects:string[]=[]
  defaultTask:Task={
    email:'',
    title:'',
    description:'',
    date:new Date(),
    priority:4,
    project:'Inbox',
    completed:false,
    subtasks:[]
  }
  selectedDate:any;
  displayCalendar:boolean=false;
  @Input() isUpdate:boolean=false;
  @Input() isSubTask:boolean=false;
  @Input() toggle:boolean=false;
  @Input() task:Task=this.defaultTask;
  @Input() parent:Task=this.defaultTask;
  @Output() parentChange:EventEmitter<Task>=new EventEmitter();
  @Output() toggleChange:EventEmitter<boolean>=new EventEmitter();
  @Input() dialog:boolean=false;
  @Output() dialogChange:EventEmitter<boolean>=new EventEmitter()


  



  resetTask(){
    this.toggleChange.emit(!this.toggle)
    this.dialogChange.emit(!this.dialog)
    this.task={...this.defaultTask}
    console.log('task reset',this.task)

  }
  handleClick(){
    console.log('handle click',this.task)
    // this.task.date=new Date()
    this.isUpdate?this.dataServices.updateTask(this.task):this.dataServices.addTask(this.task)
    this.resetTask()

  

  }
  handleDatepicker(date:any){
    this.task.date=date
    this.displayCalendar=false
    
    
    

  }
  priorityChange(val:any){
    this.task.priority=Number(val.target.value)
    console.log('priority',this.task)
  }
  projectChange(val:any){
    this.task.project=val.target.value
  }
  handleSubtask(){
    this.dataServices.addSubtask(this.task,this.parent)
    this.parent.subtasks?.push(this.task)
    this.parentChange.emit(this.parent)
    this.resetTask()

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,'changes')
  }
  ngOnInit(): void {
    this.authService.$userDetails.subscribe({next:(res:any)=>{
      this.defaultTask.email=res.email
      this.user=res.email
      this.projects=res.projects?.projects
      console.log('email added ',res.email,this.user)
    }})
  }

  

}
