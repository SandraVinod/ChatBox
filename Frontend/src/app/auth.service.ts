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
}
