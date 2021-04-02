import { CognitoUser } from 'amazon-cognito-identity-js';
import { SpiralUser, SpiralPreAuthUser } from "./auth/user";

export interface IRegisterCallback {
  registerUserCallback(error: any, user: SpiralUser);
}

export interface IFindUserNameCallback {
  getNewUserName(newUser: SpiralPreAuthUser, err: string): void;
}

export interface IPreAuthUserFetchCallback {
  getPreAuthUser(unAuthUser: SpiralPreAuthUser, err: string): void;
}

export interface IAuthenticateCallback {
  authenticateCallback(error: any, result: any): void;

  handleMFAStep?(challengeName: string, challengeParameters: IChallengeParameters, callback: (confirmationCode: string) => any): void;
}

export interface ILoggedInCallback {
  isLoggedIn(error: any, loggedIn: boolean, user: SpiralUser): void;
}

export interface IValidateSessionCallback {
  isSessionValid(apiURLAddUser: string, apiURLGetUser: string, cognitoUser: CognitoUser, session: any, loggedInCallback: ILoggedInCallback, redirectURL: string): void;
}

export interface IChallengeParameters {
  CODE_DELIVERY_DELIVERY_MEDIUM: string;

  CODE_DELIVERY_DESTINATION: string;
}

export interface ICallback {
  callback(): void;

  callbackWithParam(result: any): void;
}

export interface IConfirmCallback {
  confirmCodeCallback(error: any, result: any): void;
}

export interface IResendCodeCallback {
  resendCodeCallback(error: any, result: any): void;
}

export interface IChangePasswordCallback {
  changePasswordCallback(error: any, result: any): void;
}

export interface ICognitoSessionCallback {
  getSessionCallback(error: any, result: any): void;
}

export interface IForgotPasswordCallback {
  forgotPasswordCallback(error: any, result: any): void;
}

export interface ITempPasswordCallback {
  tempPasswordCallback(error: any, result: any): void;
}

export interface ILogoutCallback {
  logoutCallback(error: any, result: any): void;
}

export interface IUserAttributes {
  retrieveAttributesCallback(error: any, result: any): void;
}