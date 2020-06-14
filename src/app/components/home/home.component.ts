import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

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
