import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Task } from 'src/app/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) {

  }
  tasks: Array<Task> = []
  toggle: boolean = false


  delete(task: Task) {
    this.dataService.deleteTask(task)
  }

  ngOnInit(): void {
    this.dataService.$task.subscribe({ next: (res) => this.tasks=res })
  }
}
