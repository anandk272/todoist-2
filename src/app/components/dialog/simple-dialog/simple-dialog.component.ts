import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css']
})
export class SimpleDialogComponent implements OnInit{
  constructor(private dataService:DataService,private authService:AuthService){}
  @Input() display:boolean=false
  @Output() displayChange:EventEmitter<boolean>=new EventEmitter()
  projects:any
  projectForm=new FormGroup({
    project:new FormControl('',[Validators.required])
  })

  addProject(){
    this.projects?.projects.push(this.projectForm.get('project')?.value)
    this.dataService.addProject(this.projects)
    this.displayChange.emit(!this.display)
    


  }
  enter(event:any){
    if(event.code==='Enter'){
      this.addProject()
      
    }

  }

  ngOnInit(): void {
    this.authService.$userDetails.subscribe({
      next:(val:any)=>{
        this.projects=val.projects
      }
    })
      
  }




}
