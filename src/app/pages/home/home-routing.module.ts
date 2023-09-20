import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home.component';
import { CompletedComponent } from './completed/completed.component';


const routes: Routes = [{
  path: '',
  component:HomeComponent,
  children:[
    {
      path:'inbox',
      component:InboxComponent,
      
  },
  {
    path:'completed',
    component:CompletedComponent
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
