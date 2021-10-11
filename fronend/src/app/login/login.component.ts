import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  error:any=''

  user={
    username:'',
    pwd:''
  }
  loginUser(){
    this.authservice.loginUser(this.user).subscribe((res:any)=>{
     console.log(res.error);
     if(res.error=='none'){
      var id=JSON.stringify(res.id);
       sessionStorage.setItem('userid',id);
       sessionStorage.setItem('username',res.username);
       this.router.navigate(['/chats']);
     }
    },
    (error)=>{
     
      this.error=error.error;
    }
    )
    
  }
}
