import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authservice:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  user:any={
  name:'',
  username:'',
  email:'',
  pwd:''
}
addUser(){
  console.log(this.registerForm.value);
  this.authservice.AddUser(this.registerForm.value).subscribe((data)=>{
   console.log(data);
   
  })
}
registerForm=this.fb.group({
  name:['',Validators.required],
  username:['',[Validators.required,Validators.minLength(8)]],
  email:['',[Validators.pattern('^[a-z0-9,%+]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
  pwd:['',[Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.required  ]],
  repwd:['',Validators.required]
})
}
