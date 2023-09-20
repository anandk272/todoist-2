import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
  host:{
    class:'width-inbox'
  }
})
export class CompletedComponent implements OnInit{
  constructor(private authService:AuthService,private http:HttpClient){}
  completdTasks:Task[]=[]
  filter:{project:string,status:string}={
    project:'Inbox',
    status:'completed'
  }
  projects:string[]=[]

  ngOnInit(): void {
    this.authService.$userDetails.subscribe({
      next:(val:any)=>{
        this.projects=val.projects?.projects
        this.http.get<Task[]>(`http://localhost:3000/tasks?email=${val.email}&completed=true`).subscribe({
        next:(val)=>{
          this.completdTasks=val
        }

        })
  }
  })

  }


}
