import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable, OnChanges, OnInit, inject } from '@angular/core';
import { BehaviorSubject, subscribeOn } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit, DoCheck {
  tasks: Array<Task> = []
  // task:Task={
  //   title:'',
  //   description:'',
  //   date:new Date(),
  //   priority:0,
  //   project:''

  // }

  $task = new BehaviorSubject<Array<Task>>([])
  $projects=new BehaviorSubject<string[]>([])



  constructor(private http:HttpClient,private authService:AuthService) { 
    console.log(this.$task);

  }
  

  addTask(_task: Task) {
    // this.task=_task
    this.http.post("http://localhost:3000/tasks",{..._task}).subscribe({
      next:(val)=>{
        this.$task.next([...this.$task.value,_task])
        this.authService.refreshDataBase(_task.email)
        
        
      }
    })

  }
  deleteTask(_task: Task) {
    this.http.delete(`http://localhost:3000/tasks/${_task.id}`).subscribe({
      next:(res)=>{
        console.log('deleted ',res,_task.id)
      }
    })
    const temp=this.$task.value.filter((t)=>t.id!==_task.id);
    this.$task.next([...temp])
  }
  updateTask(_task: Task) {
    this.http.put(`http://localhost:3000/tasks/${_task.id}`,_task).subscribe({
      next:(res)=>{
        
       const _temp= this.$task.value.map((t)=>{
          
          if(t.id===_task.id){
            t=_task
            console.log('task updated',t)
          }
          return t
        })
        this.$task.next([..._temp])
        
      
      }
    })
  }
  addSubtask(_task:Task,_parent:Task){
    const parentSubs=_parent.subtasks as Array<Task>
    console.log(_task,'subtask',[...parentSubs,_task])
    this.http.patch(`http://localhost:3000/tasks/${_parent.id}`,{subtasks:[...parentSubs,_task]}).subscribe({
      next:(res)=>{
        const _temp= this.$task.value.map((t)=>{
          
          if(t.id===_parent.id){
            t.subtasks=[...parentSubs,{..._task}]
          }
          return t
        })
        this.$task.next([..._temp])
        this.authService.refreshDataBase(_parent.email)
        console.log('$task updated',this.$task.value)
        
        
      }
    })
  }
  deleteSubtask(_task:Task,_parent:Task){
    const parentSubs=_parent.subtasks as Array<Task>
    let deletedSubs:any=[]
    parentSubs.filter((i)=>{
      if(i!==_task){
        deletedSubs.push(i)

      }
    })
    this.http.patch(`http://localhost:3000/tasks/${_parent.id}`,{subtasks:[...deletedSubs]}).subscribe({
      next:(res)=>{
        const _temp= this.$task.value.map((t)=>{
          
          if(t.id===_parent.id){
            t.subtasks=[...deletedSubs]
          }
          return t
        })
        this.$task.next([..._temp])
        this.authService.refreshDataBase(_parent.email)
        
        
        
      }
    })
  }
  completeSubtask(_task:Task,_parent:Task){
    const parentSubs=_parent.subtasks as Array<Task>
    parentSubs.filter((t)=>{
      if(t===_task){
        t.completed=true;
      }
    })

    this.http.patch(`http://localhost:3000/tasks/${_parent.id}`,{subtasks:[...parentSubs]}).subscribe({
      next:(val)=>{
        const _temp= this.$task.value.map((t)=>{
          
          if(t.id===_parent.id){
            t.subtasks=[...parentSubs]
          }
          return t
        })
        this.$task.next([..._temp])
        this.authService.refreshDataBase(_parent.email)
        
      }
    })

  }
  addProject(projects:any){
    
    this.http.put(`http://localhost:3000/projects/${projects.id}`,{...projects}).subscribe({})
    //this.authService.getProjects(email)
      

  }
  

  ngOnInit(): void {
    this.$task.subscribe({
      next:(val)=>{
        this.tasks=val
        console.log('tasks initial value',this.tasks)
      },
      error:(err)=>console.log(err)
    })
    


  }
  ngDoCheck(): void {
    console.log('checking tasks', this.tasks)
  }


}
