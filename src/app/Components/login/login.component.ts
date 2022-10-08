import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  eyeClick:boolean=false;
  inputPassword:any="";

  constructor() { }

  ngOnInit(): void {
  }

  onEyeClick(){
    if(this.eyeClick==false){
      this.eyeClick=true;
    }else{
      this.eyeClick=false;
    }

  }
}
