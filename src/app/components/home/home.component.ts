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
    this.router.navigate(["/register"]);
  }

  gotoAuthCognitoLogin() {
    this.router.navigate(["/login"]);
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
