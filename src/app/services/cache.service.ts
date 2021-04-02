import { Injectable } from '@angular/core';
// import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  awsRegion: string = "us-east-1";
  identityPoolId: string = null;
  userPoolId: string = null;
  clientId: string = null;
  cognitoUserId: string = null;
  userAttributes: any = null;

  constructor() { }
}
