import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { CanComponentDeactivate } from 'src/app/services/guards/guards.service';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements CanComponentDeactivate {

  constructor(private dataService: DataService,private authService:AuthService) {

  }
  // isUpdate=false
  // defaultTask:Task={
  //   email:'',
  //   title:'',
  //   description:'',
  //   date:new Date(),
  //   priority:4,
  //   project:'',
  //   completed:false,
  // }
  // tasks: Array<Task> = []
  // toggle: boolean = false
  // update_task:Task=this.defaultTask;
   dialog:boolean=false
   simpleDialog:boolean=false



  // delete(task: Task) {
  //   this.dataService.deleteTask(task)
  // }
  // edit(task:Task){
  //   this.isUpdate=true;
  //   this.update_task={...task}
  //   this.toggle=!this.toggle
  //   console.log(new Date(task.date))

    
  // }
  // completeTask(task:Task){
  //   this.dataService.updateTask({...task,completed:true})
  //   const temp=this.dataService.$task.value.filter((t)=>t.id!==task.id);
  //   this.dataService.$task.next([...temp])

  // }
  // handleToggle(){
  //   this.toggle=!this.toggle
  //   this.update_task={...this.defaultTask}
  //   console.log(this.update_task)
  //   this.isUpdate=false;
  // }
  canDeactivate(){
    if (this.authService.userPresent) {
      return false
    }

    return true;
  }

  ngOnInit(): void {
    
    this.authService.$userDetails.subscribe({next:(res:any)=>{
      this.dataService.$task.next(res.tasks)
      this.dataService.$projects.next(res.projects)
      console.log(res,'sdvsdvn',res.projects)
      
    }})
  }
}
