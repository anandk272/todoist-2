import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private authService:AuthService,private dataService:DataService){}
  projects:any

  @Input() display:boolean=false;
  @Output() displayChange:EventEmitter<boolean>=new EventEmitter()


ngOnInit(): void {
  this.dataService.$projects.subscribe({
    next:(val:any)=>{
      this.projects=val
    }
  })
    
}

}
