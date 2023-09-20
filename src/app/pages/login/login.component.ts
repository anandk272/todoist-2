import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CanComponentDeactivate } from 'src/app/services/guards/guards.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  constructor(private authService:AuthService,private route:Router){}

  login=false;
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  signUp(){
    console.log(this.loginForm)
    this.authService.register({
      email:this.loginForm.controls.email.value as string,
      password:this.loginForm.controls.password.value as string
    })
  }
  logIn(){
    console.log('clicked')
    this.authService.logIn({email:this.loginForm.value.email as string,password:this.loginForm.value.password as string})

  }
  

}
