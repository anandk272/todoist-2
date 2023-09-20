import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { DateFormaterPipe } from 'src/app/pipes/dateFormater/date-formater.pipe';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompletedComponent } from './completed/completed.component';
import { TaskDetailsComponent } from 'src/app/components/dialog/task-details/task-details.component';
import { SimpleDialogComponent } from 'src/app/components/dialog/simple-dialog/simple-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    TaskFormComponent,
    DateFormaterPipe,
    InboxComponent,
    CompletedComponent,
    TaskDetailsComponent,
    SimpleDialogComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class HomeModule { }
