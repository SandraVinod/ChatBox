import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoginComponent } from './login/login.component';
import { ResendamilComponent } from './resendamil/resendamil.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path:'',component:SignupComponent},{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},{path:'chats',component:ChatComponent},
{path:'editprofile',component:EditprofileComponent},{path:'resendmail',component:ResendamilComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
