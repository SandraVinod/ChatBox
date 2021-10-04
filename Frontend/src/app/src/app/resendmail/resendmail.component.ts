import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resendmail',
  templateUrl: './resendmail.component.html',
  styleUrls: ['./resendmail.component.css']
})
export class ResendmailComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  email:any;
sendMail(){
  this.authservice.resendMail(this.email).subscribe((data)=>{
    alert('Mail send!!');
  this.router.navigate(['/login']);
  })
}
}
