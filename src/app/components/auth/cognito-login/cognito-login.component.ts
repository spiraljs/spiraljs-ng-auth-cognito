import { Component, OnInit } from '@angular/core';
import { SpiraljsNgAuthCognitoService } from 'spiraljs-ng-auth-cognito';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-cognito-login',
  templateUrl: './cognito-login.component.html',
  styleUrls: ['./cognito-login.component.css']
})
export class CognitoLoginComponent implements OnInit {
  lastMsgTitle: string = null;
  lastMsgText: string = null;
  userId: string = null;
  userPassword: string = null;

  constructor(
    private router: Router,
    public cacheSvc: CacheService,
    private loginSvc: SpiraljsNgAuthCognitoService) { }

  ngOnInit(): void {
  }

  gotoHome() {
    this.router.navigate(["/"]);
  }

  userLoginWUserName() {
    try {
      this.loginSvc.authenticate(
        this.cacheSvc.awsRegion, this.cacheSvc.identityPoolId,
        this.cacheSvc.userPoolId, this.cacheSvc.clientId,
        this.userId, this.userPassword, this);
    } catch (error) {
      console.error(error);
    }
  }

  authenticateCallback(message: string, result: any) {
    // this.isLoginProgress = false;

    if (message != null) { //error
      // this.errorMessage = message;
      this.lastMsgTitle = "message: " + message;
      this.lastMsgText = "result: " + result;
      if (message === 'User is not confirmed.') {
        console.log("redirecting");
        // this.userLoginService.registedUser = OsUserAuthInput.fromLoginInput(this.isPhoneInput, this.phoneCode, this.emailOrPhone, null);
        //UserAuthInput.fromUserInput(this.email, this.phoneCode, this.phoneNumber);
        this.router.navigate(['/auth/cognito/confirm-code']);
      } else if (message === 'User needs to set password.') {
        console.log("redirecting to set new password");
        this.router.navigate(['/auth/cognito/new-password']);
      }
    } else { //success
      this.lastMsgTitle = "success";
      // this.lastMsgText = "User logged in successfully";
      this.lastMsgText = JSON.stringify(result);
      //this.ddb.writeLogEntry("login");
      // this.router.navigate(['/']);
    }
  }
}
