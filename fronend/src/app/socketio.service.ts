import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';
import { environment } from './../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {

  constructor() { }
  socket:any;
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
  joinUser(data:any){
    this.socket.emit('joinuser',data);
  }
  joinRoom(data:any) {
    //console.log(data);
    this.socket.emit('join', data);
  }
  removeUser(userId:any){
    console.log(userId);
    this.socket.emit('removeUser',userId.slice(1,-1));
  }
 addUser(userId:any){
   
   this.socket.emit('addUser',userId.slice(1,-1));
 }
  /*sendMessage(data:any): void {
    this.socket.emit('message', data);
  }*/
  sendMessage(data:any) {
    this.socket.emit('message', data);
  }
 
 
  public getList(userid:any){
   this.socket.emit('getlist',userid);
  }
Notification(){
  const observable=new Observable<{user:any,message:any,room:any,muted:any}>(observer=>{
    this.socket.on('notification',(data:any)=>{
      observer.next(data)
    })
    return () => {
      this.socket.disconnect();
    };
  })
  return observable;
}
  public getMessages = () => {
    return Observable.create((observer:any) => {
        this.socket.on('new-message', (message:any) => {
            
            observer.next(message);
        });
    });
}
checkBlocked():any{
  const observable=new Observable<{ blocked : Boolean,user : any}>((observer:any)=>{
    //console.log('hiiiiiiiiiiiiiiiii');
    this.socket?.on('block',(data:any)=>{
      console.log(data);
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
  })
  return observable;
}
newMessageReceived() {
  const observable = new Observable<{ user: any, message: any}>(observer => {
    this.socket.on('new message', (data:any) => {
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
  });
  return observable;
}

/*getOnlineUsers(){
  const observable = new Observable <{users:any}>(observer=>{
    this.socket.on('getusers',()=>{
      observer.next();
    })
  })
  return observable;
}*/
checkMuted():any{
  const observable=new Observable<{data:any}>(observer=>{
this.socket.on('mute',(data:any)=>{
  observer.next(data);
})
return()=>{
  this.socket.disconnect();
}
  })
  return observable;
}
 getOnline():any{
  const observable=new Observable<{users:any}>(observer=>{
    this.socket.on('get online',(users:any)=>{
      observer.next(users);
    })
    return () => {
      this.socket.disconnect();
    };
  })
  return observable;
 }
}
