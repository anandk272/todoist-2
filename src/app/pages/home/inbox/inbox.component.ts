import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  host:{
    class:'width-inbox'
  }
})
export class InboxComponent {
  constructor(private dataService: DataService,private authService:AuthService) {

  }
  isUpdate=false
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
  tasks: Array<Task> = []
  toggle: boolean = false
  update_task:Task=this.defaultTask;
  dialog:boolean=false
  parent:Task=this.defaultTask
  taskDetailsDialog:boolean=false




  delete(task: Task) {
    this.dataService.deleteTask(task)
  }
  edit(task:Task){
    this.isUpdate=true;
    this.update_task={...task}
    this.toggle=!this.toggle
    console.log(new Date(task.date))

    
  }
  completeTask(task:Task){
    this.dataService.updateTask({...task,completed:true})
    const temp=this.dataService.$task.value.filter((t)=>t.id!==task.id);
    this.dataService.$task.next([...temp])

  }
  handleToggle(){
    this.toggle=!this.toggle
    this.update_task={...this.defaultTask}
    console.log(this.update_task)
    this.isUpdate=false;
  }
  handleTaskDetails(task:Task){
    this.parent=task;
    this.taskDetailsDialog=true

  }
  canDeactivate(){
    if (this.authService.userPresent) {
      return false
    }

    return true;
  }

  ngOnInit(): void {
    this.dataService.$task.subscribe({ next: (res) => {
      this.tasks=res }})
    

    this.authService.$userDetails.subscribe({
      next:(res:any)=>{
        this.defaultTask.email=res.email
        console.log('scs');
        
      
      },
      error:(err)=>console.log(err)
      
    })
    
  }

}
