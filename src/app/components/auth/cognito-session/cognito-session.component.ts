import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { SpiralUser, ILoggedInCallback } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-session',
  templateUrl: './cognito-session.component.html',
  styleUrls: ['./cognito-session.component.css']
})
export class CognitoSessionComponent implements OnInit, ILoggedInCallback {
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

  getSession() {
    this.loginSvc.getSession(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this);
  }

  getSessionCallback(message: string, result: any) {
    if (message) {
      this.lastMsgTitle = "Failed";
      this.lastMsgText = message;
    } else {
      this.lastMsgTitle = "Session: ";
      this.lastMsgText = JSON.stringify(result);
    }
  }

  /**
 *   From Cognito.service.ts
 */
  getUser() {
    var currUser: CognitoUser = this.loginSvc.getCurrentUser(this.cacheSvc.userPoolId, this.cacheSvc.clientId);
    if (currUser) {
      this.cacheSvc.cognitoUserId = currUser.getUsername();
      this.lastMsgTitle = "User: ";
      this.lastMsgText = JSON.stringify(currUser);
    } else {
      this.lastMsgTitle = "Error: ";
      this.lastMsgText = "Not able to retrieve user";
    }
  }

  getUserAttributes() {
    this.loginSvc.retrieveAtribute(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this.cacheSvc.cognitoUserId, this)
  }

  retrieveAttributesCallback(error: any, result: any) {
    if (error) {
      this.lastMsgTitle = "Failed: ";
      this.lastMsgText = error.message;
    } else {
      this.lastMsgTitle = "Session: ";
      this.lastMsgText = JSON.stringify(result);
    }
  }

  getCustomProfile() {
    var apiGetUser = "https://evys4xw4b8.execute-api.us-east-1.amazonaws.com/dev/master/cognitouser/cognitoId";
    this.loginSvc.isAuthenticated(this.cacheSvc.userPoolId, this.cacheSvc.clientId, this, apiGetUser);
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

}
