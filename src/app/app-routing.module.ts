import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard, GuardsService } from './services/guards/guards.service';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',canActivate:[GuardsService],canDeactivate:[DeactivateGuard],loadChildren:()=>import('./pages/home/home.module').then(mod=>mod.HomeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
