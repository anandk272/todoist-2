import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { DataService } from '../data/data.service';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private route:Router) { }

  $userDetails=new BehaviorSubject({});
  userPresent=false
  register(user:any){
    this.http.post('http://localhost:3000/users',user).subscribe({
      next:(res)=>{
        console.log(res)
        this.http.post('http://localhost:3000/projects',{email:user.email,projects:[]}).subscribe()
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  logIn(data:{email:string,password:string}){
    
    this.http.get<any>('http://localhost:3000/users').subscribe({
      next:(res)=>{
          const result={}
          res.find((a:any)=>{
            if(a.email === data.email && a.password === data.password){
              this.userPresent=true
              this.route.navigate(['home'])
              this.refreshDataBase(a.email)
              this.getProjects(a.email)
              
            }
          })
          
      },
    })
  }
  logOut(){
    this.userPresent=false
  }
  isUser(){
    if(this.userPresent){
      return true
    }else{
      return false
    }
  }
  refreshDataBase(email:string){
    this.http.get<Task[]>(`http://localhost:3000/tasks?email=${email}&completed=false`).subscribe({
              next:(val)=>{
                this.$userDetails.next({...this.$userDetails.value,email:email,tasks:val})
                //this.getProjects(email)
              },
              error:(err)=>{
                console.log(err,email)
              }
            })

  }
  getProjects(email:string){
    this.http.get(`http://localhost:3000/projects?email=${email}`).subscribe({
      next:(val:any)=>{
        console.log('projects',val)
        this.$userDetails.next({...this.$userDetails.value,projects:val[0]})
      
      }
      // next:(val:Array<string>)=>{
      //   console.log('projects',val)
      //   this.$userDetails.next({...this.$userDetails.value,projects:val[0]})
      // }
    })
  }
}
