import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { IChangePasswordCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-change-pwd',
  templateUrl: './cognito-change-pwd.component.html',
  styleUrls: ['./cognito-change-pwd.component.css']
})
export class CognitoChangePwdComponent implements OnInit, IChangePasswordCallback {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;
  oldPassword: string = null;
  newPassword: string = null;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,    
    private loginSvc: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }

  changePassword() {
    this.loginSvc.changePassword(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId,  this.oldPassword, this.newPassword, this);
  }

  changePasswordCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = " Success";
      this.lastMsgText = JSON.stringify(result);
    }
  }

}
