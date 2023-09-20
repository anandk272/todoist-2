import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todoist';
  constructor(private authService:AuthService,private http:HttpClient,private dataService:DataService){

  }
  $userData=new Observable(observer=>{
    this.http.get('http://localhost:3000/users').subscribe({
        next:(res)=>{
          observer.next(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    
  })


  ngOnInit(): void {
    this.$userData.subscribe({
      next:(res)=>{
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this.dataService.$task.subscribe({
      next:(val)=>{
      }
    })
    this.authService.$userDetails.subscribe(({
      next:(res:any)=>{}
    }))
    
      
      
  }
}
