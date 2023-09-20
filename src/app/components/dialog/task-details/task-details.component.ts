import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  constructor(private dataService:DataService){}
  @Input() parent:any
  show_addTask:boolean=false
  @Input() display:boolean=false
  @Output() displayChange:EventEmitter<boolean>=new EventEmitter()

  handleClose(){
    this.displayChange.emit(!this.display)
  }
  refreshParent(){
    this.dataService.$task.subscribe({
      next:(res)=>{
        res.filter((i)=>{
          if(i.id===this.parent.id){
            this.parent=i
          }
          
        })
        
      }
    })

  }
  deleteSubtask(subtask:Task){
    this.dataService.deleteSubtask(subtask,this.parent)
    this.refreshParent()
  }
  completeSubtask(subtask:Task){
    this.dataService.completeSubtask(subtask,this.parent)
  }
  completeTask(_parent:Task){
    this.handleClose()
    this.dataService.updateTask({..._parent,completed:true})
    const temp=this.dataService.$task.value.filter((t)=>t.id!==_parent.id);
    this.dataService.$task.next([...temp])
  }
  
ngOnInit(): void {}

}
