import { BookModel } from './../../Model/BookModel';
import { WishlistModel } from './../../Model/WishlistModel';
import { WishlistService } from './../../Services/wishlist.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
 // userWishList: WishlistModel = new WishlistModel(0, []);
  // userWishlistBookModel: BookModel = new BookModel(0, '', '', '', '', 0, 0);
  userWishlistBookList:any=[];
  token: any;

  constructor(private wishService: WishlistService) {}

  ngOnInit(): void {
    this.getWishlistBooks();
  }

  getWishlistBooks() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.wishService.getWishlistBooksByUserId(this.token).subscribe((response: any) => {
          this.userWishlistBookList = response.data;
          // this.userWishlistBookListCount =this.userWishlistBookList;
          console.log(this.userWishlistBookList);
        });
    }
  }
}
