import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { AuthService } from '../auth/auth.service';


export const GuardsService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    const router=inject(Router);
    const authService=inject(AuthService)
    if(authService.isUser()){
      console.log('redirecting');
      return true
    }else{
      router.navigate([''])
      return false
    }

    
}


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}



export const DeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
    if (component.canDeactivate()) {
      console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - allowed`);
      return true;
    } else {
      console.log(`💂‍♀️ [Guard] - Can Deactivate Guard - not allowed`);
      return false;
  }
}

