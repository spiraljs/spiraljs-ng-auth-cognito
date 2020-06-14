export class SpiralUser {
    ClientId: number;
    UserId: number;
    UserName: string;
    FirstName: string;
    LastName: string;
    RoleId: number;
    RoleName: string;
    CognitoUserName: string;
    Email: string;
    Phone: string;
    CityId: string;
    CityName: string;
    StateId: string;
    StateName: string;
    CountryId: string;
    CountryName: string;
    PostalCode: string;
    CurrencyCode: string;
    CurrencySymbol: string;
    TimeZoneCode: string;
    UTCOffset: string;
    ProfileImageFileName: string;
    //Companies: Company[];
    // PersonalCompanies: Company[];
    // BusinessCompanies: Company[];
    // NonprofitCompanies: Company[];
    // SharedCompanies: Company[];
    SelectedCompanyTypeId: number;
    //SelectedCompany: Company;
    //MenuItems: MenuItem[];
    IdToken: string;

    /*
    static fromCognitoUser(userId: number, cognitoUser: CognitoUser): User {
        var cogUser = new User();
        cogUser.UserId = userId;
        cogUser.CognitoUserName = cognitoUser.getUsername();
        cogUser.Email = cognitoUser.getUsername();
        return cogUser;
    }
    */

    toString() {
        return this.UserName;
    }
}

export class SpiralUserAuthInput {
    userId: number = 0;
    username: string = null;
    username_suffix: number = 0;
    first_name: string = null;
    last_name: string = null;
    email: string = null;
    phone: number = 0;
    phone_code: number = 0;
    phone_number: number = 0;
    oldPassword: string = null;
    newPassword1: string = null;
    newPassword2: string = null;
    acceptTnC: boolean = false;
    location_id: number = 0;
    city_id: string = null;
    postal_code: string = null;
    ConfirmCode: string = null;
    validation_error: string = null;

    toString() {
        return this.username;
    }

    getUserName() {
        var fname = this.first_name.replace(" ", "").toLowerCase();
        var lname = this.last_name.replace(" ", "").toLowerCase();
        return fname + "-" + lname;
    }

    setPhone(phoneCode: number, phoneNumber: number) {
        if (phoneNumber && phoneNumber > 0) {
            this.phone_code = phoneCode;
            this.phone_number = phoneNumber;
            if (phoneCode && phoneCode > 0) {
                // Concatenating CountryCode and Phone Number (eg. 16267155268)
                this.phone = parseInt(phoneCode.toString() + phoneNumber.toString());
            }
        } else {
            this.phone = null;
            this.phone_code = null;
            this.phone_number = null;
        }
    }

    getPhoneWPlus() {
        if (this.phone) {
            return "+" + this.phone.toString();
        } else {
            return null;
        }
    }

    isEmailPhoneValid() {
        if (this.email == null || this.email == "") {
            console.log(this.phone_number);
            if (this.phone_number == null || this.phone_number <= 0) {
                this.validation_error = "Either Email or Phone Number is required"
                return false;
            }
            if (this.phone_code == null || this.phone_code <= 0) {
                this.validation_error = "Country code is required with Phone Number"
                return false;
            }
        }

        return true;
    }

    isValidToRegister() {
        if (!this.isEmailPhoneValid()) {
            return false;
        }

        if (this.newPassword1 != this.newPassword2) {
            this.validation_error = "Passwords are not matching"
            return false;
        }

        if (!this.acceptTnC) {
            this.validation_error = "Please accept Terms Of Use and Privacy Policy";
            return false;
        }

        return true;
    }

    isValidToConfirmCode() {
        if (!this.isEmailPhoneValid()) {
            return false;
        }

        if (this.ConfirmCode == null || this.ConfirmCode.trim() == '') {
            this.validation_error = "Confirmation Code is required";
            return false;
        }

        return true;
    }

    isValidToResendCode() {
        if (!this.isEmailPhoneValid()) {
            return false;
        }

        return true;
    }

    isValidToLogin() {
        if (!this.isEmailPhoneValid()) {
            return false;
        }

        if (this.newPassword1 == null || this.newPassword1.trim() == '') {
            this.validation_error = "Password is required";
            return false;
        }

        return true;
    }

    isValidToRequestCodeForPassword() {
        if (!this.isEmailPhoneValid()) {
            return false;
        }

        return true;
    }

    isValidToForgotPasswordChange() {
        if (this.ConfirmCode == null || this.ConfirmCode.trim() == '') {
            this.validation_error = "Verification Code is required";
            return false;
        }

        if (this.newPassword1 == null || this.newPassword1.trim() == '' || this.newPassword2 == null || this.newPassword2.trim() == '') {
            this.validation_error = "Password is required";
            return false;
        }

        if (this.newPassword1 != this.newPassword2) {
            this.validation_error = "Passwords are not matching"
            return false;
        }

        return true;
    }

    isValidToChangeCurrentPassword() {
        if (this.userId <= 0) {
            this.validation_error = "User not found";
            return false;
        }

        if (this.oldPassword == null || this.oldPassword.trim() == '') {
            this.validation_error = "Old Password is required";
            return false;
        }

        if (this.newPassword1 == null || this.newPassword1.trim() == '' || this.newPassword2 == null || this.newPassword2.trim() == '') {
            this.validation_error = "New Password is required";
            return false;
        }

        if (this.newPassword1 != this.newPassword2) {
            this.validation_error = "New Passwords are not matching"
            return false;
        }

        return true;
    }

    //static fromUserInput(email: string, phoneCode: number, phoneNumber: number) {
    static fromUserInput(isPhoneInput: boolean, phoneCode: number, emailOrPhone: string) {
        var email = null;
        var phoneNumber = null;
        if (isPhoneInput) {
            phoneNumber = parseInt(emailOrPhone);
            email = null;
        } else {
            phoneNumber = null;
            email = emailOrPhone;
        }

        var newUser = new SpiralUserAuthInput();
        newUser.email = email;
        newUser.setPhone(phoneCode, phoneNumber);
        return newUser;
    }

    //static fromConfirmCodeInput(email: string, phoneCode: number, phoneNumber: number, confirmCode: string) {
    static fromConfirmCodeInput(isPhoneInput: boolean, phoneCode: number, emailOrPhone: string, confirmCode: string) {
        // var newUser = new UserAuthInput();
        // newUser.email = email;
        // newUser.setPhone(phoneCode, phoneNumber);
        var newUser = SpiralUserAuthInput.fromUserInput(isPhoneInput, phoneCode, emailOrPhone);
        newUser.ConfirmCode = confirmCode;
        return newUser;
    }

    static findInputType(emailOrPhone): string {
        var inputType = "text";
        if (emailOrPhone.trim().length == 0) {
            inputType = "email";
        } else {
            if (emailOrPhone.match(/^\d/)) {
                inputType = "number";
            } else {
                inputType = "email";
            }
        }
        return inputType;
    }

    static isInputTypePhone(inputType): boolean {
        return (inputType == "number");
    }

    static fromLoginInput(isPhoneInput: boolean, phoneCode: number, emailOrPhone: string, password: string) {
        // var email = null;
        // var phoneNumber = null;
        // if (isPhoneInput) {
        //     phoneNumber = parseInt(emailOrPhone);
        //     email = null;
        // } else {
        //     phoneNumber = null;
        //     email = emailOrPhone;
        // }

        var newUser = SpiralUserAuthInput.fromUserInput(isPhoneInput, phoneCode, emailOrPhone);
        //newUser.email = email;
        //newUser.setPhone(phoneCode, phoneNumber);
        newUser.newPassword1 = password;
        return newUser;
    }

    // static fromLoginInput(email: string, phoneCode: number, phoneNumber: number, password: string) {
    //     var newUser = new UserAuthInput();
    //     newUser.email = email;
    //     newUser.setPhone(phoneCode, phoneNumber);
    //     newUser.newPassword1 = password;
    //     return newUser;
    // }

    static fromForgotAndChangePasswordInput(userName: string, verificationCode: string, password1: string, password2: string) {
        var newUser = new SpiralUserAuthInput();
        newUser.username = userName;
        newUser.ConfirmCode = verificationCode;
        newUser.newPassword1 = password1;
        newUser.newPassword2 = password2;
        return newUser;
    }

    static fromChangePasswordInput(user: SpiralUser, oldPassword: string, password1: string, password2: string) {
        var loggedUser = new SpiralUserAuthInput();
        if (user) {
            loggedUser.userId = user.UserId;
        } else {
            loggedUser.userId = 0;
        }
        loggedUser.oldPassword = oldPassword
        loggedUser.newPassword1 = password1;
        loggedUser.newPassword2 = password2;
        return loggedUser;
    }

    static fromPreAuthUser(preAuthUser: SpiralPreAuthUser) {
        var newUser = new SpiralUserAuthInput();
        newUser.username = preAuthUser.CognitoUserName;
        return newUser;
    }
}

export class SpiralNewPasswordUser {
    username: string;
    existingPassword: string;
    password: string;

    toString() {
        return this.username;
    }
}

export class SpiralPreAuthUser {
    CognitoUserName: string;
    CognitoUserNameSuffix: number;
    Error: string;

    toString() {
        return this.CognitoUserName;
    }
}
