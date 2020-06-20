import { Component, OnInit } from '@angular/core';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { Router } from '@angular/router';
import { IConfirmCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-confirm-cognito-code',
  templateUrl: './confirm-cognito-code.component.html',
  styleUrls: ['./confirm-cognito-code.component.css']
})
export class ConfirmCognitoCodeComponent implements OnInit, IConfirmCallback {
  lastMsgTitle: string;
  lastMsgText: string;
  userId: string = null;
  code2Confirm: string = null;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,
    private loginSvc: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }

  confirmCode() {
    this.loginSvc.confirmCode(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId, this.code2Confirm, this);
  }

  confirmCodeCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = " Success";
      this.lastMsgText = JSON.stringify(result);
    }
  }

}
