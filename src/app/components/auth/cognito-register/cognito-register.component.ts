import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpiralUser, SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-register',
  templateUrl: './cognito-register.component.html',
  styleUrls: ['./cognito-register.component.css']
})
export class CognitoRegisterComponent implements OnInit {
  userId: string = null;
  userPhoneCode: number = 1;
  userPhoneNum: string = null;
  userEmail: string = null;
  userPassword: string = null;
  lastMsgTitle: string = null;
  lastMsgText: string = null;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,
    private cognitoLoginService: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  gotoCognitoHome() {
    this.router.navigate(["/auth/cognito"]);
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }

  registerUser() {
    var email = null;
    var phone = null;
    if (this.userEmail) {
      email = this.userEmail;
    }
    if (this.userPhoneNum) {
      phone = "+" + this.userPhoneNum;
    }
    this.cognitoLoginService.registerUser(
      this.cacheSvc.userPoolId, this.cacheSvc.clientId,
      this.userId, this.userPassword,
      email, phone, this);
  }

  registerUserCallback(error: any, user: SpiralUser) {
    console.log(typeof(error));
    if (error) {
      this.lastMsgTitle = "Error: ";
      this.lastMsgText = error.message;
    } else {
      this.lastMsgTitle = "Registered";
      this.lastMsgText = JSON.stringify(user);
    }
  }

}
