import { DoCheck, Injectable, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/task.interface';

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



  constructor() {

    console.log(this.$task);

  }

  addTask(_task: Task) {
    // this.task=_task
    this.tasks.push(_task);
    this.$task.next(this.tasks);
  }
  deleteTask(_task: Task) {

    const temp=this.tasks.filter((t)=>t===_task);

    this.tasks=this.tasks.filter((task)=>task!==_task);

    console.log(temp);
  
    this.$task.next(this.tasks)
  }

  
  updateTask(_task: Task) {
    console.log('update task')
    this.tasks.filter((task, index) => {
      if (task === _task) {
        task = { ..._task }
      }
    })
  }

  ngOnInit(): void {


  }
  ngDoCheck(): void {
    console.log('checking tasks', this.tasks)
  }


}
