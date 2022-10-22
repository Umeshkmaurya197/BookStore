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
    if (localStorage.getItem('token')) {
      this.token = true;
      this.userToken = localStorage.getItem('token');
      this.userService.findUser(this.userToken).subscribe((response: any) => {
        this.userModel = response.data;
      });
    }
  }

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.token=false;
    }
  }
}
