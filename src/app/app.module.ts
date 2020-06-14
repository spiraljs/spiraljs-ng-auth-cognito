import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CognitoHomeComponent,
    CognitoRegisterComponent,
    CognitoLoginComponent,
    SetCognitoPasswordComponent,
    ConfirmCognitoCodeComponent,
    CognitoResendCodeComponent,
    CognitoChangePwdComponent,
    CognitoForgotPwdComponent,
    CognitoSessionComponent,
    CognitoLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
