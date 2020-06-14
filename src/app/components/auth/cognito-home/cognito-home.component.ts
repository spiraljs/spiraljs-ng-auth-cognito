import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-home',
  templateUrl: './cognito-home.component.html',
  styleUrls: ['./cognito-home.component.css']
})
export class CognitoHomeComponent implements OnInit {

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
    this.router.navigate(["/auth/cognito/register"]);
  }

  gotoAuthCognitoLogin() {
    this.router.navigate(["/auth/cognito/login"]);
  }

  gotoAuthCognitoConfirmCode() {
    this.router.navigate(["/auth/cognito/confirm-code"]);
  }

  gotoAuthCognitoResendCode() {
    this.router.navigate(["/auth/cognito/resend-code"]);
  }

  gotoAuthCognitoChangePwd() {
    this.router.navigate(["/auth/cognito/change-password"]);
  }

  gotoAuthCognitoForgotCode() {
    this.router.navigate(["/auth/cognito/forgot-password"]);
  }

  gotoAuthCognitoSession() {
    this.router.navigate(["/auth/cognito/get-session"]);
  }

  logoutUser() {
    this.router.navigate(["/auth/cognito/logout"]);
  }
}
