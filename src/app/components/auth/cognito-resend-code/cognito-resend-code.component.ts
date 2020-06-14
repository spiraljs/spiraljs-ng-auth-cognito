import { Component, OnInit } from '@angular/core';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { Router } from '@angular/router';
import { IResendCodeCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-resend-code',
  templateUrl: './cognito-resend-code.component.html',
  styleUrls: ['./cognito-resend-code.component.css']
})
export class CognitoResendCodeComponent implements OnInit, IResendCodeCallback {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;

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

  resendCode() {
    this.loginSvc.resendConfirmCode(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId, this);
  }

  resendCodeCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = " Success";
      this.lastMsgText = JSON.stringify(result);
    }
  }

}
