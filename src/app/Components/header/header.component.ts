import { UserModel } from './../../Model/UserModel';
import { UserService } from './../../Services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  enteredSearchValue: string="";
  @Output()  searchTextChanged:EventEmitter<string>= new EventEmitter<string>();
  @Input() cartCount: number = 0;

  token: boolean = false;
  userToken: any;
  userModel: UserModel = new UserModel('', '', '', 0);
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('outside of if', localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.token = true;
      this.userToken = localStorage.getItem('token');
      console.log(this.token);
      this.userService.findUser(this.userToken).subscribe((response: any) => {
        console.log(response);
        this.userModel = response.data;
        console.log(this.userModel);
      });
    }
  }

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.ngOnInit();
    }
  }
}
