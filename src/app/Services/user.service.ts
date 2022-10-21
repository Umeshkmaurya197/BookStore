import { UserLoginModel } from './../Model/UserLoginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../Model/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl=environment.host;
  constructor(private http: HttpClient) {}

  addNewUser(userModel:UserModel){
    return this.http.post(`${this.baseUrl}/user/register`,userModel);
  }

  userLogin(userLoginModel:UserLoginModel){
    return this.http.post(`${this.baseUrl}/user/user-log-in`,userLoginModel);
  }

  findUser(token:string){
    return this.http.get(`${this.baseUrl}/user/get-user-by-id/?token=${token}`);
  }
}
