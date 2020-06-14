import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { ILogoutCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-logout',
  templateUrl: './cognito-logout.component.html',
  styleUrls: ['./cognito-logout.component.css']
})
export class CognitoLogoutComponent implements OnInit, ILogoutCallback {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;
  code2Confirm: string = null;

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

  logout() {
    this.loginSvc.logout(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.userId, this);
  }

  logoutCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = "Success: ";
      this.lastMsgText = JSON.stringify(result);
    }
  }

}
