import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resendamil',
  templateUrl: './resendamil.component.html',
  styleUrls: ['./resendamil.component.css']
})
export class ResendamilComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  email:any;
  error:any;
  sendMail(){
    this.authservice.resendMail(this.email).subscribe((res:any)=>{
      if(res.success==false){
       this.error='User not found';
      }
      else{
        this.error='';
      alert('Mail send!!');
    this.router.navigate(['/login']);
      }
    })
  }
}
