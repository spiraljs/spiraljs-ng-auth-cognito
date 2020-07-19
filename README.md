# SpiralJSNgAuthCognitoTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

You can test this project at http://test.ng-auth-cognito.spiraljs.org


## Steps to build library
1. npm install
2. ng build spiraljs-ng-auth-cognito
3. cd dist/spiraljs-ng-auth-cognito
4. npm pack
5. You will get a tgz file which can be used in your project


## Steps to test this library from local
1. npm install
2. ng build spiraljs-ng-auth-cognito
3. ng serve -o
4. Goto http://localhost:4200


## Steps to test this test online 
1. Goto http://test.ng-auth-cognito.spiraljs.org/


## How to register a new User in AWS Cognito
1. Create a User Pool in AWS Cognito. See https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html 
2. Goto User Pool,  Collect "Pool ID" and "App client id"
3. Goto http://test.ng-auth-cognito.spiraljs.org/
4. Provide Pool ID, Client ID, User ID and password and "Register"
5. No you see the new user created under your AWS User Pool



