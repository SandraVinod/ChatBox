import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  error:any=''

  user={
    username:'',
    pwd:''
  }
  loginUser(){
    this.authservice.loginUser(this.user).subscribe((res)=>{
     console.log(res);
    },
    (error)=>{
      console.log(error);
      this.error=error.error;
    }
    )
    
  }
}
