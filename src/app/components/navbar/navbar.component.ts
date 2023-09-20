import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private dataService:DataService,private route:Router){}
  @Output() OpenDialog=new EventEmitter<boolean>(true)
  ngOnInit(): void {
    this.dataService.$task.subscribe((res)=>{
      
    })
  }
  handleDialog(){
    this.OpenDialog.emit(!this.OpenDialog)
  }

}
