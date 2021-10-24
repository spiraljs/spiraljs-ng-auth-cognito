import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService, SpiralUser, ILoggedInCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ILoggedInCallback {
  lastMsgTitle: string;
  lastMsgText: string;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,
    private loginSvc: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  
  gotoHome() {
    this.router.navigate(["/"]);
  }

  gotoAuthCognitoRegister() {
    this.router.navigate(["/register"]);
  }

  gotoAuthCognitoLogin() {
    this.router.navigate(["/login"]);
  }

  checkUserLoggedIn() {
    this.loginSvc.isAuthenticated(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this);
  }

  isLoggedIn(message: string, isLoggedIn: boolean, user: SpiralUser) {
    if (!isLoggedIn) {
      // this.router.navigate(['/']);
      // this.currUserAsStr = message;
      this.lastMsgTitle = "Failed: ";
      this.lastMsgText = message;
    } else {
      // this.populateUserProfile(user);
      this.lastMsgTitle = "User: ";
      this.lastMsgText = JSON.stringify(user);
    }
  }

  gotoAuthCognitoConfirmCode() {
    this.router.navigate(["/confirm-code"]);
  }

  gotoAuthCognitoResendCode() {
    this.router.navigate(["/resend-code"]);
  }

  gotoAuthCognitoChangePwd() {
    this.router.navigate(["/change-password"]);
  }

  gotoAuthCognitoChangeTempPwd() {
    this.router.navigate(["/change-temp-password"]);
  }

  gotoAuthCognitoForgotCode() {
    this.router.navigate(["/forgot-password"]);
  }

  gotoAuthCognitoSession() {
    this.router.navigate(["/get-session"]);
  }

  logoutUser() {
    this.router.navigate(["/logout"]);
  }

}
