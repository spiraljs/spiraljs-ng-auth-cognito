import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CognitoHomeComponent } from './components/auth/cognito-home/cognito-home.component';
import { CognitoRegisterComponent } from './components/auth/cognito-register/cognito-register.component';
import { CognitoLoginComponent } from './components/auth/cognito-login/cognito-login.component';
import { SetCognitoPasswordComponent } from './components/auth/set-cognito-password/set-cognito-password.component';
import { ConfirmCognitoCodeComponent } from './components/auth/confirm-cognito-code/confirm-cognito-code.component';
import { CognitoResendCodeComponent } from './components/auth/cognito-resend-code/cognito-resend-code.component';
import { CognitoChangePwdComponent } from './components/auth/cognito-change-pwd/cognito-change-pwd.component';
import { CognitoForgotPwdComponent } from './components/auth/cognito-forgot-pwd/cognito-forgot-pwd.component';
import { CognitoSessionComponent } from './components/auth/cognito-session/cognito-session.component';
import { CognitoLogoutComponent } from './components/auth/cognito-logout/cognito-logout.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "auth/cognito", component: CognitoHomeComponent },
  { path: "auth/cognito/register", component: CognitoRegisterComponent },
  { path: "auth/cognito/login", component: CognitoLoginComponent },
  { path: "auth/cognito/get-session", component: CognitoSessionComponent },
  { path: "auth/cognito/confirm-code", component: ConfirmCognitoCodeComponent },
  { path: "auth/cognito/resend-code", component: CognitoResendCodeComponent },
  { path: "auth/cognito/set-password", component: SetCognitoPasswordComponent },
  { path: "auth/cognito/change-password", component: CognitoChangePwdComponent },
  { path: "auth/cognito/forgot-password", component: CognitoForgotPwdComponent },
  { path: "auth/cognito/logout", component: CognitoLogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
