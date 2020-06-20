import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//import { CognitoHomeComponent } from './components/auth/cognito-home/cognito-home.component';
import { CognitoRegisterComponent } from './components/auth/cognito-register/cognito-register.component';
import { CognitoLoginComponent } from './components/auth/cognito-login/cognito-login.component';
import { SetCognitoPasswordComponent } from './components/auth/set-cognito-password/set-cognito-password.component';
import { ConfirmCognitoCodeComponent } from './components/auth/confirm-cognito-code/confirm-cognito-code.component';
import { CognitoResendCodeComponent } from './components/auth/cognito-resend-code/cognito-resend-code.component';
import { CognitoChangePwdComponent } from './components/auth/cognito-change-pwd/cognito-change-pwd.component';
import { CognitoForgotPwdComponent } from './components/auth/cognito-forgot-pwd/cognito-forgot-pwd.component';
import { CognitoSessionComponent } from './components/auth/cognito-session/cognito-session.component';
import { CognitoLogoutComponent } from './components/auth/cognito-logout/cognito-logout.component';

/*
  { path: "home", component: HomeComponent },
  { path: "auth/cognito", component: CognitoHomeComponent },
*/

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: CognitoRegisterComponent },
  { path: "login", component: CognitoLoginComponent },
  { path: "get-session", component: CognitoSessionComponent },
  { path: "confirm-code", component: ConfirmCognitoCodeComponent },
  { path: "resend-code", component: CognitoResendCodeComponent },
  { path: "set-password", component: SetCognitoPasswordComponent },
  { path: "change-password", component: CognitoChangePwdComponent },
  { path: "forgot-password", component: CognitoForgotPwdComponent },
  { path: "logout", component: CognitoLogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
