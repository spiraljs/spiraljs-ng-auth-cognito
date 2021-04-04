import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService, ITempPasswordCallback } from 'spiraljs-ng-auth-cognito';
// import {  } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-temp-pwd',
  templateUrl: './cognito-temp-pwd.component.html',
  styleUrls: ['./cognito-temp-pwd.component.css']
})
export class CognitoTempPwdComponent implements OnInit, ITempPasswordCallback {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;
  // oldPassword: string = null;
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
    var userAttributes = {
      "email": this.cacheSvc.cognitoUserId
    }
    this.loginSvc.changeTempPassword(this.cacheSvc.cognitoUser,  this.newPassword, userAttributes, this);
  }

  tempPasswordCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = " Success";
      this.lastMsgText = JSON.stringify(result);
    }
  }



}
