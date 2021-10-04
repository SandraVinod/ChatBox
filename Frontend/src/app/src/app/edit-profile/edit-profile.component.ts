import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }
 url='./assets/User.png';
 img:any;
 username:any;
  ngOnInit(): void {
  this.authservice.getProfile(sessionStorage.getItem('userid')?.slice(1,-1)).subscribe((data:any)=>{
    this.username=data.username;
  })
  }
  onFileSelected(event:any){
    if(event.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
      this.img=event.target.files[0];
    }
    
  }
  error:any;
  checkUsername(event:any){
    var uname=event.target.value;
   this.authservice.checkUsername(uname).subscribe((res:any)=>{
       //console.log(res);
       if(res.msg=='no'){
        this.error='Username not available';
       }
       if(res.msg=='yes'){
         this.error='';
       }
   })
 }
  editProfile(){
    var fd=new FormData;
    fd.append('img',this.img);
    fd.append('username',this.username);
    
    var user=sessionStorage.getItem('userid')?.slice(1,-1);
    fd.append('id',user!)
    this.authservice.editProfile(fd).subscribe((data)=>{
      
    })
    alert('Success!');
    this.router.navigate(['/chats']);
  }
}
