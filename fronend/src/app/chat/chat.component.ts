import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Socket } from 'socket.io-client';
import { AuthService } from '../auth.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socketService: SocketioService,private authservise:AuthService,private router:Router,private toastr: ToastrService) { 
    this.reciever!=sessionStorage.getItem('recieverid');
    if ( this.sender! < this.reciever!) {
      this.chatroom = this.sender!.concat(this.reciever!);
    } else {
      this.chatroom = this.reciever!.concat(this.sender!);
    }
    console.log(this.reciever);
    if(this.onlineusers.includes(this.reciever?.slice(1,-1))){
      this.online='Online';
      
    }
    if(!this.onlineusers.includes(this.reciever?.slice(1,-1))){
      this.online='';
    }
    console.log(this.online);
  }
  messages: string[] = [];
  senderMessages:string[]=[]
  members:any=[];
  username:any=''
  copyMsg:any;
  mssg='Type a message...'
  message: any;
  messageList:any= [];
  /*username=localStorage.getItem('username');*/
  sender=sessionStorage.getItem('userid');
  reciever='';
  private chatroom:any;
  class="topnav";
  online:any='';
  onlineusers:any=[];
  muted=false;
  blocked=false;
  image:any;
  meBlocked=false;
  ngOnInit(): void {
    var  userid= sessionStorage.getItem('userid');
    this.authservise.getConvo(userid).subscribe((data)=>{
     var d=JSON.parse(JSON.stringify(data));
     console.log(d);
    this.socketService.joinUser(sessionStorage.getItem('userid'));
    console.log(d);
    var m:any=[];
    for(var i=0;i<d.length;i++){
      //console.log(d)
      if(d[i].user==userid?.slice(1,-1)){
        if(!m.includes(d[i].contact)){
          console.log(d[i]);
          m.push({user:d[i].contact,msg:d[i].msg.message});
          }
        
      }
      
    }
    
   this.members=m ; 
   //console.log('hiiiii');
   //console.log(this.members);
   })
   
    this.socketService.setupSocketConnection();
    this.socketService.addUser(userid);
    this.socketService.checkBlocked().subscribe((data:any)=>{
      //console.log(data);
      if(data.blocked==true && data.user!=this.sender){
        this.blocked=true;
        this.mssg='You can no longer send message in this chat!';
  
      }
      else if(data.blocked==false){
        this.blocked=false;
        this.mssg='Type message...';
      }
    })
    this.socketService.getOnline().subscribe((value:any)=>{
       console.log(value);
       this.onlineusers=JSON.parse(JSON.stringify(value));
       if(this.onlineusers.includes(sessionStorage.getItem("recieverid")?.slice(1,-1))){
         this.online='online';
         
       }
       else{
         this.online='';
       }
    })
    // 
    this.socketService.Notification().subscribe((data)=>{
      console.log(data);
      var user=sessionStorage.getItem('userid')?.slice(1,-1);
      var dat=data.user+':   '+data.message;
     console.log(data.muted);
     
      if(data.room!=this.chatroom && data.muted[0]?.user!=user && data.muted[1]?.user!=user){
        console.log('yyyyyyy');
      this.toastr.success(dat,'New Notification');
      }
    })
    this.socketService.newMessageReceived().subscribe((data:any) => {
      console.log(data.user);
      console.log(data.type);
     
     if(data.user!=sessionStorage.getItem('userid')){
      if(data.room==this.chatroom){
        this.messageList.unshift(data);
        }
      var index=this.members.findIndex((x:any)=>{
        return x.user._id===data.user.slice(1,-1);
       })
       console.log(index);
       //console.log(data);
       this.members[index].msg=data.message; 
     }
      else {
     
          this.messageList.unshift(data);
          
      var index=this.members.findIndex((x:any)=>{
        return x.user._id===this.reciever.slice(1,-1);
       })
       console.log(index);
       //console.log(data);
       this.members[index].msg=data.message;
      }
    });
  }
  searchUsers(){
    this.authservise.searchUsers(this.username).subscribe((data)=>{
           //console.log(data);
           var m=[];
           var d=JSON.parse(JSON.stringify(data));
          for(var i=0;i<d.length;i++){
            m.push({user:d[i],msg:''})
          }
          this.members=m;
          //console.log(this.members)
    })
  }
  update(event:any){
    this.username=event.target.value;
    
  }
  
  ngOnDestroy(){
    //console.log('hi');
    var  userid= sessionStorage.getItem('userid');
    this.socketService.removeUser(userid);
    this.socketService.disconnect();
   // localStorage.clear();
     
    
  }
  imge:any;
  setRoom(id:any,username:any,img:any){
     this.imge=img;
    id=JSON.stringify(id);
    this.reciever=id;
    sessionStorage.setItem("recieverid",id);
    this.username=username;
    //this.reciever!=localStorage.getItem('recieverid');
    //console.log(this.reciever)
    if ( this.sender! < this.reciever!) {
      this.chatroom = this.sender!.concat(this.reciever!);
    } else {
      this.chatroom = this.reciever!.concat(this.sender!);
    }
     
    if(this.onlineusers.includes(sessionStorage.getItem("recieverid")?.slice(1,-1))){
      this.online='online';
    }
    else{
      this.online=''
    }
 



    this.socketService.joinRoom({user:this.sender,room:this.chatroom,receiver:this.reciever});
    this.authservise.getChatRoomsChat(this.chatroom).subscribe((data :any)=> {
      this.messageList = JSON.parse(JSON.stringify(data.messages)).reverse();
      var receiver=sessionStorage.getItem('recieverid')?.slice(1,-1);
      var user=sessionStorage.getItem("userid")?.slice(1,-1);
      
      if(data.muted[0]?.user==user || data.muted[1]?.user==user){
        this.muted=true;
      }
      else{
        this.muted=false;
      }
      if(data.blocked[0]?.user==receiver || data.blocked[1]?.user==receiver){
       this.blocked=true;
       this.mssg='You can no longer send message in this chat'
      }
      else{
        this.blocked=false;
        this.mssg="Type a message..."
      }
      
      if(data.blocked[0]?.user==user || data.blocked[1]?.user==user){
        this.meBlocked=true;
      }
      else{
        this.meBlocked=false;
      }
    // console.log(data.blocked.indexOf({user:this.reciever.slice(1,-1)}));
     
    });
   
  }
 
  onPaste(){
  navigator.clipboard.readText().then(s => this.message=s);
  }

    checkUser(){
      
       return this.sender;
    }
    checkBlocked(){
      return this.blocked;
    }
    sendMessage() {
      var user=sessionStorage.getItem('username');
      console.log(this.image);
      if(this.image){
        console.log("File selected");
        //console.log(this.image);
        var fd=new FormData();
       fd.append('image',this.image)
       fd.append('user',this.sender!);
       fd.append('room',this.chatroom)
       fd.append('username',user!);
       fd.append('sendto',this.reciever);
        this.authservise.imageSending(fd).subscribe((res)=>{
          //console.log(formdata);
        })
       // this.socketService.sendMessage({room:this.chatroom,sendto:this.reciever,username:user,user:this.sender,type:'file',mymetype:this.image.type,message:this.image.name});
        this.authservise.makeConversations(this.sender,this.reciever).subscribe((data)=>{
          // if(data){
          //   this.messageList.push()
          // }
         })
        this.image='';
        this.message='';

      }
     else{
      console.log("no file");
      console.log(this.chatroom);
      this.socketService.sendMessage({room: this.chatroom,sendto:this.reciever,username:user, user: this.sender,type:'text', message: this.message});
     
      this.authservise.makeConversations(this.sender,this.reciever).subscribe((data)=>{
        // if(data){
        //   this.messageList.push()
        // }
       })
      this.message = '';
       
     }
      // var user=localStorage.getItem('username');
      // this.socketService.sendMessage({room: this.chatroom,sendto:this.reciever,username:user, user: this.sender, message: this.message});
     
      // this.authservise.makeConversations(this.sender,this.reciever).subscribe((data)=>{
      //   // if(data){
      //   //   this.messageList.push()
      //   // }
      //  })
      // this.message = '';
      
    }
  editProfile(){
    this.router.navigate(['/editprofile']);
  } 
  showNavbar(){
    if(this.class=='topnav'){
    this.class="topnav responsive";
    }
    else{
      this.class="topnav";
    }
  }
  getCopy(msg:any){
    return msg;
  }
  muteUser(){
    this.muted=true;
    
    var user=sessionStorage.getItem("userid")?.slice(1,-1);
    
    var c=confirm("You won't receive any notification from this user anymore. Do you want to continue?");
    if(c){
    this.authservise.muteUser(this.chatroom,user,this.reciever.slice(1,-1)).subscribe((data)=>{
       //this.muted=true;
    })
    }
  }
 unMuteUser(){
  this.muted=false;
  var user=sessionStorage.getItem("userid")?.slice(1,-1);
  var c=confirm("Are you sure you want to unmute the user?");
  if(c){
    this.authservise.unmuteUser(this.chatroom,user,this.reciever.slice(1,-1)).subscribe((data)=>{

    })
  }
 }
  blockUser(){
    var c=confirm("This user won't be able to send further messages.Do you want to continue?");
    if(c){
      this.meBlocked=true;
      var user=sessionStorage.getItem("userid")?.slice(1,-1);
      //console.log(this.chatroom);
      this.authservise.blockUser(this.chatroom,user,this.reciever).subscribe((data)=>{
        //console.log(data);
      })
    }
  };
  unblockUser(){
    var c=confirm("Are you sure you want to unblock this user?")
    if(c){
    var user=sessionStorage.getItem("userid")?.slice(1,-1);
    this.authservise.unBlockUser(this.chatroom,user,this.reciever).subscribe((data)=>{
    
       
      //this.mssg='Type a message...';
    })
    this.meBlocked=false;
  }
  }
onFileSelected(e:any){
this.message=e.target.files[0].name;
this.image=e.target.files[0];

}

}
