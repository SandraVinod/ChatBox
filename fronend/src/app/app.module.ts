import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { SocketioService } from './socketio.service';
import { ToastrModule } from 'ngx-toastr';
import { CdkCopyToClipboard, Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResendamilComponent } from './resendamil/resendamil.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChatComponent,
    EditprofileComponent,
    ResendamilComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    SocketIoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-left'
    }),
    
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
