import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-forgot-pwd',
  templateUrl: './cognito-forgot-pwd.component.html',
  styleUrls: ['./cognito-forgot-pwd.component.css']
})
export class CognitoForgotPwdComponent implements OnInit {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;
  newPassword: string = null;
  verificationCode: string = null;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,
    private loginSvc: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  gotoCognitoHome() {
    this.router.navigate(["/auth/cognito"]);
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }
  
  forgotPassword(){
    this.loginSvc.forgotPassword(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId,  this);
  }

  confirmPassword(){
    this.loginSvc.confirmNewPassword(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId, this.verificationCode, this.newPassword, this);
  }

  forgotPasswordCallback(message: string, result: any){
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = " Success";
      this.lastMsgText = JSON.stringify(result);
    }
  }

}
