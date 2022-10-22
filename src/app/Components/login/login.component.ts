import { UserLoginModel } from './../../Model/UserLoginModel';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: UserLoginModel = new UserLoginModel('', '');
  eyeClick: boolean = false;
  token: string = '';
  signup: UserModel = new UserModel('', '', '', 91);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onEyeClick() {
    if (this.eyeClick == false) {
      this.eyeClick = true;
    } else {
      this.eyeClick = false;
    }
  }

  userLogin() {
    this.userService.userLogin(this.login).subscribe((response: any) => {
      this.token = response.data;
      this.router.navigate(['dashboard']);
      localStorage.setItem('token', this.token);
    });
  }

  userSignup() {
    this.userService.addNewUser(this.signup).subscribe((response: any) => {
      this.userSignup = response.data;
      this.router.navigate(['dashboard']);
    });
  }
}
