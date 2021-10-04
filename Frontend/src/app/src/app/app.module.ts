import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { SocketioService } from './socketio.service';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-left'
    })
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
