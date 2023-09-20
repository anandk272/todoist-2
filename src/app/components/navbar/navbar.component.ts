import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private dataService:DataService){}
  ngOnInit(): void {
    this.dataService.$task.subscribe((res)=>{
      console.log('task observer subscribed',res)
      
    })

  }

}
