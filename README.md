# SpiralJSNgAuthCognitoTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

Library can be downloaded from https://s3.amazonaws.com/code.spiraljs.org/ng/auth/cognito/spiraljs-ng-auth-cognito-1.0.0.tgz

You can test this project at http://test.ng-auth-cognito.spiraljs.org


## How to build library and test
### Steps to build library
    npm install
    ng build spiraljs-ng-auth-cognito
    cd dist/spiraljs-ng-auth-cognito
    npm pack
You will get a tgz file which can be used in your project


### Steps to test this library from local
    npm install
    ng build spiraljs-ng-auth-cognito
    ng serve -o
Now you can see the test app running in  http://localhost:4200


### Steps to test this test online 
1. Goto http://test.ng-auth-cognito.spiraljs.org/


## How to register a new User in AWS Cognito
1. Create a User Pool in AWS Cognito. See https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html 
2. Goto User Pool,  Collect **Pool Id** and **App client Id**
3. Goto http://test.ng-auth-cognito.spiraljs.org/
4. Provide **Pool Id**, **Client Id**, **User Id** and password and "Register"
5. Now you can see the new user created under your AWS User Pool



