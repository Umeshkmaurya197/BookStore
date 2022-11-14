import { WishlistModel } from './../../Model/WishlistModel';
import { WishlistService } from './../../Services/wishlist.service';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from './../../Services/cart.service';
import { BookService } from './../../Services/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/Model/CartModel';
import { MatSort } from '@angular/material/sort';

interface SortBy {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  searchText: string = '';
  page: number = 1;
  bookList: any = [];
  bookCount: number = 0;
  cartBookCount: number = 0;
  addedToCartBtn: boolean = false;
  bookIdList: any = [];
  bookQuantityList: any = [];
  token: any;
  userCart: CartModel = new CartModel(0, [], []);
  userWishlist: WishlistModel = new WishlistModel(0, []);
  selectorValue: string = '';
  bookDescription: string = '';
  selected: string = '';

  bookIdWishList: any = [];

  sortsBy: SortBy[] = [
    { value: '', viewValue: 'Sort by relevance' },
    { value: 'Price : High to Low', viewValue: 'Price : High to Low' },
    { value: 'Price : Low to High', viewValue: 'Price : Low to High' },
    { value: 'Newest Arrivals', viewValue: 'Newest Arrivals' },
  ];

  constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
    // this.getAllWishListBooks();
  }

  // ==============================================================
  // for Search Functionality
  onSearchTextEnterd(searchValue: string) {
    this.searchText = searchValue;
  }

  // ==============================================================
  //for showing books filter by category
  filterSelector(selectedValue: string) {
    this.selected = selectedValue;

    console.log('selector called ' + selectedValue);
    if (selectedValue == '') {
      this.getAllBooks();
    }
    if (selectedValue == 'Price : High to Low') {
      this.bookService.getBookByPriceHighToLow().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
      });
    }
    if (selectedValue == 'Price : Low to High') {
      this.bookService.getBookByPriceLowToHigh().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
      });
    }
    if (selectedValue == 'Newest Arrivals') {
      this.bookService.getBookByNewestArrivel().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
      });
    }
  }

  // ==============================================================
  // it will all  books available in bookstore
  getAllBooks() {
    this.getCartBooksByUserId();
    this.getWishList();
    this.bookService.getAllbooks().subscribe((response: any) => {
      this.bookList = response.data;
      console.log(this.bookList);
      this.bookList.paginator = this.paginator;
      // this.bookList.sort = this.sort;
      this.bookCount = this.bookList.length;
    });
  }

  // ==============================================================
  //this will add books into the cart
  addtoCartPushId(bookId: number, bookQuantity: number) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');

      if (this.bookIdList.includes(bookId) == false) {
        this.bookIdList.push(bookId);
        this.bookQuantityList.push(bookQuantity);
      }
      this.userCart.bookId = this.bookIdList;
      this.userCart.quantity = this.bookQuantityList;
      this.cartService
        .addBookToCart(this.token, this.userCart)
        .subscribe((response: any) => {
          this.ngOnInit();
        });
    } else {
      console.log('we are in add to cart btn an going for login page');
      this.router.navigate(['login']);
    }
  }

  //=======================================================================
  //Add to wishlist
  addToWishList(bookId: number) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      if (this.bookIdWishList.includes(bookId) == false) {
        this.bookIdWishList.push(bookId);
      }
      this.userWishlist.bookId = this.bookIdWishList;
      this.wishlistService
        .createWishlist(this.token, this.userWishlist)
        .subscribe((response: any) => {
          this.ngOnInit();
        });
    }
  }

  //=======================================================================
  //get All books In wishlist by UserId
  getWishList() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.wishlistService
        .getWishlistByUserId(this.token)
        .subscribe((response: any) => {
          this.userWishlist = response.data;
          this.bookIdWishList = response.data.bookId;
        });
    }
  }

  //=======================================================================
  //remove Book From Wishlist
  removeBookFromWishlist(bookId: number) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.wishlistService
        .removeBookFromWishlist(bookId, this.token)
        .subscribe((response: any) => {
          // console.log(response);
          this.bookIdWishList = response.data.bookId;
        });
    }
  }

  //=======================================================================
  // remove books from cart
  removeBookFromCart(bookId: number) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .removeBookFromCart(this.token, bookId)
        .subscribe((response: any) => {
          console.log(response);
          this.userCart = response.data;
          this.bookQuantityList = response.data.quantity;
          this.bookIdList = response.data.bookId;
          this.cartBookCount = this.bookIdList.length;
          this.ngOnInit();
        });
    }
  }

  // ==============================================================
  // this method will return  added btn property and for cartBookCounter
  getCartBooksByUserId() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .getCartByUserId(this.token)
        .subscribe((response: any) => {
          this.userCart = response.data;
          this.bookIdList = response.data.bookId;
          this.bookQuantityList = response.data.quantity;
          this.cartBookCount = this.bookIdList.length;
        });
    }
  }
}
