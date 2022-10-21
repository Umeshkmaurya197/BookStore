export class UserModel {
  fullName: string;
  email: string;
  password: string;
  mobileNumber:number;

  constructor(fullName: string,email: string,password: string,mobileNumber:number) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.mobileNumber = mobileNumber;
  }
}
