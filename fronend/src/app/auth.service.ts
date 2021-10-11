import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  AddUser(user:any){
    return this.http.post<any>("http://localhost:3000/signup",{user:user})
  }
  loginUser(user:any){
    console.log(user);
    return this.http.post("http://localhost:3000/login",{user:user})
  }
  getConvo(userid:any){
    return this.http.get("http://localhost:3000/conversations/"+userid);
  }
  searchUsers(username:any){
    return this.http.get("http://localhost:3000/search/"+username)
  }
  getChatRoomsChat(chatroom:any){
    return this.http.get("http://localhost:3000/messages/"+chatroom)
  }
  imageSending(fd:any){
    return this.http.post("http://localhost:3000/images",fd)
  }
  makeConversations(senderId:any,recieverId:any){
    return this.http.post("http://localhost:3000/conversations/",{senderId:senderId,recieverId:recieverId});
  }
  muteUser(chatroom:any,user:any,receiver:any){
    console.log(receiver)
    return this.http.post("http://localhost:3000/messages/mute",{chatroom:chatroom,user:user,receiver:receiver})
  }
  unmuteUser(chatroom:any,user:any,receiver:any){
    console.log(receiver)
    return this.http.post("http://localhost:3000/messages/unmute",{chatroom:chatroom,user:user,receiver:receiver})
  }
  blockUser(chatroom:any,user:any,receiver:any){
    return this.http.post("http://localhost:3000/messages/block",{chatroom:chatroom,user:user,receiver:receiver})
  }
  unBlockUser(chatroom:any,user:any,receiver:any){
    return this.http.post("http://localhost:3000/messages/unblock",{chatroom:chatroom,user:user,receiver:receiver})
  }
  checkUsername(username:any){
    return this.http.get("http://localhost:3000/check/"+username);
  }
  getProfile(user:any){
    return this.http.get("http://localhost:3000/conversations/profile/"+user)
  }
  editProfile(fd:any){
    return this.http.post("http://localhost:3000/conversations/editprofile",fd);
  }
  resendMail(email:any){
    return this.http.get("http://localhost:3000/resendmail/"+email)
  }
}
