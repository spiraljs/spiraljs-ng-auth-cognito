import { Injectable } from '@angular/core';
import { Observable, config } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as STS from "aws-sdk/clients/sts";
import { SpiralUser, SpiralUserAuthInput } from './auth/user';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import { ILoggedInCallback, IValidateSessionCallback, IRegisterCallback, IConfirmCallback, IResendCodeCallback, IChangePasswordCallback, ICognitoSessionCallback, IForgotPasswordCallback, ITempPasswordCallback, ILogoutCallback, IUserAttributes, IAuthenticateCallback } from './spiraljs-ng-auth-cognito-interface';

@Injectable({
  providedIn: 'root'
})
export class SpiraljsNgAuthCognitoService {
  registedUser: SpiralUserAuthInput = null;
  currentUser: SpiralUser = null;

  constructor(
    private http: HttpClient
  ) {
    //private awsCognitoSvc: OsAwsCognitoService
  }

  /**
   * @ignore
   */
  private prepareCognitoPool(userPoolId: string, clientId: string): CognitoUserPool {
    var cognitoPoolData = {
      UserPoolId: userPoolId, // Your user pool id here
      ClientId: clientId // Your client id here
    };
    // this.cognitoUserPool = new CognitoUserPool(cognitoPoolData);
    return new CognitoUserPool(cognitoPoolData);
  }

  /**
   * @ignore
   */
  private prepareAuthDetails(userPool: CognitoUserPool, userId: string, userPwd: string): AuthenticationDetails {
    /*
    var cognitoUserData = {
      Username: userId,
      Pool: userPool
    };
    */
    var authenticationData = {
      Username: userId,
      Password: userPwd
    };
    // this.authenticationDetails = new AuthenticationDetails(authenticationData);
    return new AuthenticationDetails(authenticationData);
  }

  prepareCognitoUser(userPool: CognitoUserPool, userId: string) {
    var cognitoUserData = {
      Username: userId,
      Pool: userPool
    };
    return new CognitoUser(cognitoUserData);
  }

  /**
   * Registering a user with the application. One needs to create a CognitoUserPool object 
   * by providing a UserPoolId and a ClientId and signing up by using a username, password, 
   * attribute list, and validation data
   * @param {string} userId User Id
   * @example
   * sample code here
   */
  registerUser(userPoolId: string, clientId: string, userId: string, password: string,
    email: string, phone: string, registerCallback: IRegisterCallback) {

    try {
      if (!userPoolId || userPoolId.trim() == "") {
        throw new Error("User Pool Id is required");
      }
      if (!clientId || clientId.trim() == "") {
        throw new Error("Client Id is required");
      }
      if (!userId || userId.trim() == "") {
        throw new Error("User Id is required");
      }
      if (!password || password.trim() == "") {
        throw new Error("Password is required");
      }

      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      // this.prepareAuthDetails(userId, password);
      var attributeList = [];

      if (email) {
        var dataEmail = {
          Name: 'email',
          Value: email
        };
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);
      }

      if (phone) {
        var dataPhoneNumber = {
          Name: 'phone_number',
          Value: phone
        };
        var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
        attributeList.push(attributePhoneNumber);
      }

      userPool.signUp(userId, password, attributeList, null, function (err, result) {
        if (err) {
          registerCallback.registerUserCallback(err, null);
        } else {
          var cognitoUser = new SpiralUser();
          cognitoUser.CognitoUserName = result.user.getUsername();
          registerCallback.registerUserCallback(null, cognitoUser);
          // console.log('user name is ' + cognitoUser.getUsername());
        }
      });
    } catch (error) {
      registerCallback.registerUserCallback(error, null);
    }

  }

  /**
   * Authenticating a user and establishing a user session with the Amazon Cognito Identity service.
   * @param {string} userId User Id to Login
   * @param {string} userPwd Password to Login
   * @example
   * var userId = 'firstname-lastname';
   * var password = '12345678';
   * authService.login(userId, password);
   */
  authenticate(awsRegion: string, identityPoolId: string, userPoolId: string, clientId: string, userId: string, password: string, callback: IAuthenticateCallback) {
    try {
      if (!awsRegion || awsRegion.trim() == "") {
        throw new Error("AWS Region is required");
      }
      if (!userPoolId || userPoolId.trim() == "") {
        throw new Error("User Pool Id is required");
      }
      if (!clientId || clientId.trim() == "") {
        throw new Error("Client Id is required");
      }
      if (!userId || userId.trim() == "") {
        throw new Error("User Id is required");
      }
      if (!password || password.trim() == "") {
        throw new Error("Password is required");
      }

      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = this.prepareCognitoUser(userPool, userId);
      var authDetails = this.prepareAuthDetails(userPool, userId, password);

      var url = "cognito-idp." + awsRegion + ".amazonaws.com/" + userPoolId;
      console.log(url);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (session) {
          console.log(session);
          var accessToken = session.getAccessToken().getJwtToken();
          // console.log(accessToken);

          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = awsRegion;

          // let url = ;
          let logins: any = {};
          logins[url] = accessToken;

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPoolId,
            Logins: logins,
            LoginId: userId
          },
            {
              // optionally provide configuration to apply to the underlying service clients
              // if configuration is not provided, then configuration will be pulled from AWS.config
              region: awsRegion,
              // specify timeout options
              httpOptions: {
                timeout: 200
              }
            });
          // console.log(AWS.config.credentials);
          let clientParams: any = {};
          let sts = new STS(clientParams);
          sts.getCallerIdentity(function (err, data) {
            // console.log("Dummy AWS SDK call to refresh the session");
            callback.authenticateCallback(null, session);
          });
        },

        onFailure: function (err) {
          // alert(err.message || JSON.stringify(err));
          callback.authenticateCallback(err.message || JSON.stringify(err), null);
        },

        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;

          callback.authenticateCallback("new_password_required", userAttributes);
        }

      });
    } catch (error) {
      callback.authenticateCallback(error, null);
    }
  }

  isAuthenticated(userPoolId: string, clientId: string, loggedInCallback: ILoggedInCallback, apiURLGetUser?: string) {
    try {
      var apiURLAddUser = "";

      if (loggedInCallback == null)
        throw ("UserLoginService: Callback in isAuthenticated() cannot be null");

      if (this.currentUser != null) {
        //console.log("User is available in Globals...");
        loggedInCallback.isLoggedIn(null, true, this.currentUser);
      } else {
        var userPool = this.prepareCognitoPool(userPoolId, clientId);
        let cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null && cognitoUser.getUsername() != null) {
          this.validateSession(apiURLAddUser, apiURLGetUser, cognitoUser, this, loggedInCallback, null);
        } else {
          // console.log("UserLoginService: can't retrieve the current user");
          // loggedInCallback.isLoggedIn("Can't retrieve the CurrentUser", false, null);
          throw new Error("Can't retrieve the CurrentUser");
        }
      }
    } catch (error) {
      loggedInCallback.isLoggedIn(error, false, null);
    }
  }

  validateSession(apiURLAddUser: string, apiURLGetUser: string, cognitoUser: CognitoUser, validateSessionCallback: IValidateSessionCallback, loggedIncallback: ILoggedInCallback, redirectURL: string) {
    try {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
          //loggedIncallback.isLoggedIn(err, false, null);
          throw new Error(err.message);
        }
        else {
          console.log("UserLoginService: Session is " + session.isValid());
          validateSessionCallback.isSessionValid(apiURLAddUser, apiURLGetUser, cognitoUser, session, loggedIncallback, redirectURL);
        }
      });
    } catch (error) {
      loggedIncallback.isLoggedIn(error, false, null);
    }
  }

  isSessionValid(apiURLAddUser: string, apiURLGetUser: string, cognitoUser: CognitoUser, session: any, loggedInCallback: ILoggedInCallback, redirectURL: string) {
    try {
      if (!session.isValid()) {
        // loggedInCallback.isLoggedIn("Invalid session", false, null);
        throw new Error("Invalid session");
      } else {
        let cognitoUserName = cognitoUser.getUsername();
        let token = session.getIdToken().getJwtToken();
        if (apiURLGetUser) {
          this.getUser(apiURLGetUser, cognitoUserName, token).subscribe(
            users => {
              console.log("Loading users...");
              console.log(users);
              if (users != null) {
                if (users.length > 0) {
                  this.currentUser = users[0];
                  // this.currentUser.Preferences = this.userSvc.getUserPreferences(this.currentUser.UserId);
                  // Gets Identity-Token from Cognito
                  this.currentUser.IdToken = session.getIdToken().getJwtToken();
                  console.log("User loaded from API: " + this.currentUser.CognitoUserName);
                  var thisPage = redirectURL + "/user/login";
                  //this.loggingService.log(UserActivity.login(thisPage, this.currentUser));
                  loggedInCallback.isLoggedIn(null, true, this.currentUser);
                } else {
                  // loggedInCallback.isLoggedIn("Can't retrieve the CurrentUser", false, null);
                  throw new Error("Can't retrieve the CurrentUser");
                }
              } else {
                // loggedInCallback.isLoggedIn("Not able to read User from API", false, null);
                throw new Error("Not able to read User from API");
              }
            },
            err => {
              var errMsg = (err && err.statusText) ? err.statusText : "Not able to read User from API";
              // loggedInCallback.isLoggedIn(errMsg, false, null);
              throw new Error(errMsg);
            });
        } else {
          this.currentUser = new SpiralUser();
          this.currentUser.CognitoUserName = cognitoUserName;
          // Gets Identity-Token from Cognito
          this.currentUser.IdToken = session.getIdToken().getJwtToken();
          loggedInCallback.isLoggedIn(null, true, this.currentUser);
        }
      }
    } catch (error) {
      loggedInCallback.isLoggedIn(error, false, null);
    }
  }

  getUser(apiURLGetUser, cognitoId, idToken): Observable<SpiralUser[]> {
    var header = null;
    const url = apiURLGetUser + "/" + cognitoId;
    console.log(url);
    return this.http.get<SpiralUser[]>(url);
  }

  /**
   * method desc
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  logout(userPoolId: string, clientId: string, userId: string, callback: ILogoutCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      if (userPool) {
        var cognitoUser = this.prepareCognitoUser(userPool, userId);
        // var userId = cognitoUser.getUsername();
        cognitoUser.signOut();
        this.currentUser = null;
        console.log("logged out successfully");
        callback.logoutCallback(null, "User " + userId + " logged out successfully");
      } else {
        console.log("no session found");
        // callback.logoutCallback("No session found", null);
        throw new Error("No session found");
      }
    } catch (error) {
      callback.logoutCallback(error, null);
    }
  }

  /**
   * method desc
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  /*
     getCurrentSession(userPoolId: string, clientId: string) {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = userPool.getCurrentUser();
  
      if (cognitoUser) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            throw new Error(err.message || JSON.stringify(err))
          }
        });
      } else {
        throw new Error("No session found");
      }
    }
  */

  /**
   * Confirming a registered, unauthenticated user using a confirmation code received via SMS.
   * @param {string} code Verfication Code sent by Cognito to confirm
   * @param {string} userId User Id
   * @example
   * sample code here
   */
  confirmCode(userPoolId: string, clientId: string, userId: string, code: string, callback: IConfirmCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var userData = {
        Username: userId,
        Pool: userPool
      };

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          // console.log(err.message || JSON.stringify(err));
          // callback.confirmCodeCallback(err.message, null);
          throw new Error(err.message || JSON.stringify(err));
        } else {
          // console.log('call result: ' + result);
          callback.confirmCodeCallback(null, result);
        }
      });
    } catch (error) {
      callback.confirmCodeCallback(error, null);
    }
  }

  /**
   * Resending a confirmation code via SMS for confirming registration for a unauthenticated user.
   * @param {string} userId User Id who is requesting to resend
   * @example
   * sample code here
   */
  resendConfirmCode(userPoolId: string, clientId: string, userId: string, callback: IResendCodeCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var userData = {
        Username: userId,
        Pool: userPool
      };

      var cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
          // console.log(err.message || JSON.stringify(err));
          // callback.resendCodeCallback(err.message, null);
          throw new Error(err.message || JSON.stringify(err));
        } else {
          console.log('call result: ' + result);
          callback.resendCodeCallback(null, result);
        }
      });
    } catch (error) {
      callback.resendCodeCallback(error, null);
    }
  }


  /**
   * Changing the current password for an authenticated user.
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  changePassword(userPoolId: string, clientId: string, userId: string, oldPassword: string, newPassword: string, callback: IChangePasswordCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      let cognitoUser = userPool.getCurrentUser();

      if (cognitoUser == null) {
        // callback.changePasswordCallback("User is not authenticated.", null);
        // return;
        throw new Error("User is not authenticated.");
      }

      cognitoUser.getSession(function (err, session) {
        if (err) {
          // console.log(err);
          // callback.changePasswordCallback("Invalid user session.", null);
          throw new Error("Invalid user session.");
        }
        else {
          var currUserId = session.getAccessToken().payload.username;
          if (currUserId != userId) {
            // callback.changePasswordCallback("Invalid User Id.", null);
            throw new Error("Invalid User Id.");
          } else {
            console.log(session.isValid());
            cognitoUser.changePassword(oldPassword, newPassword, function (err, result) {
              if (err) {
                // callback.changePasswordCallback(err.message, null);
                throw new Error(err.message);
              } else {
                callback.changePasswordCallback(null, result);
              }
            });
          }
        }
      });
    } catch (error) {
      callback.changePasswordCallback(error, null);
    }
  }


  /**
   * Changing the current password for an authenticated user.
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  getSession(userPoolId: string, clientId: string, callback: ICognitoSessionCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      let cognitoUser = userPool.getCurrentUser();

      if (cognitoUser) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            throw new Error("Invalid user session.");
          }
          else {
            callback.getSessionCallback(null, session);
          }
        });
      } else {
        throw new Error("User is not authenticated.");
      }
    } catch (error) {
      callback.getSessionCallback(error, null);
    }
  }

  /**
   *   From Cognito.service.ts
   */
  getCurrentUser(userPoolId: string, clientId: string) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      return userPool.getCurrentUser();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Retrieve user attributes for an authenticated user
   * @param {string} userId User Id
   * @example
   * sample code here
   */
  retrieveAtribute(userPoolId: string, clientId: string, userId: string, callback: IUserAttributes) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = this.prepareCognitoUser(userPool, userId);

      if (cognitoUser) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            throw new Error(err.message || JSON.stringify(err));
          }
          console.log('session validity: ' + session.isValid());

          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              throw new Error(err.message || JSON.stringify(err));
            } else {
              callback.retrieveAttributesCallback(null, result);
            }
            // for (var i = 0; i < result.length; i++) {
            //   console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
            // }
          });
        })
      } else {
        throw new Error("User is not authenticated.");
      }
    } catch (error) {
      callback.retrieveAttributesCallback(error, null);
    }
  }

  /**
   * method desc
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  forgotPassword(userPoolId: string, clientId: string, userId: string, callback: IForgotPasswordCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = this.prepareCognitoUser(userPool, userId);

      cognitoUser.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          // console.log('CodeDeliveryData from forgotPassword: ' + data);
          callback.forgotPasswordCallback(null, data);
        },
        onFailure: function (err) {
          // alert(err.message || JSON.stringify(err));
          // callback.forgotPasswordCallback(err.message, null);
          throw new Error(err.message || JSON.stringify(err));
        },
        inputVerificationCode() {
          callback.forgotPasswordCallback(null, null);
        }
      });
    } catch (error) {
      callback.forgotPasswordCallback(error, null);
    }
  }

  /**
   * method desc
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  confirmNewPassword(userPoolId: string, clientId: string, userId: string, verificationCode: string, newPassword: string, callback: IForgotPasswordCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = this.prepareCognitoUser(userPool, userId);

      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: function () {
          callback.forgotPasswordCallback(null, "New Password Confirmed");
        },
        onFailure: function (err) {
          // callback.forgotPasswordCallback(err.message, null);
          throw new Error(err.message);
        }
      });
    } catch (error) {
      callback.forgotPasswordCallback(error, null);
    }
  }

  /**
   * method desc
   * @param {string} param1 desc
   * @param {string} param2 desc
   * @returns {string} return value desc
   * @example
   * sample code here
   */
  changeTempPassword(userPoolId: string, clientId: string, userId: string, newPassword: string, userAttributes: any, callback: ITempPasswordCallback) {
    try {
      var userPool = this.prepareCognitoPool(userPoolId, clientId);
      var cognitoUser = this.prepareCognitoUser(userPool, userId);

      cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
        onSuccess: result => {
          callback.tempPasswordCallback(null, "Temporary Password Changed");
        },
        onFailure: err => {
          throw err
        }
      })

    } catch (error) {
      callback.tempPasswordCallback(error, null);
    }
  }
}
