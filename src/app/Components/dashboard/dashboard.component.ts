import { MatPaginator } from '@angular/material/paginator';
import { BookModel } from './../../Model/BookModel';
import { CartService } from './../../Services/cart.service';
import { BookService } from './../../Services/book.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
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

  searchText:string='';
  page: number = 1;
  bookList: any = [];
  bookCount: number = 0;
  cartBookCount: number = 0;
  addedToCartBtn: boolean = false;
  bookIdList: any = [];
  bookQuantityList: any = [];
  token: any;
  userCart: CartModel = new CartModel(0, [], []);
  selectorValue: string = '';

  sortsBy: SortBy[] = [
    { value: '', viewValue: 'Sort by relevance' },
    { value: 'Price : High to Low', viewValue: 'Price : High to Low' },
    { value: 'Price : Low to High', viewValue: 'Price : Low to High' },
    { value: 'Newest Arrivals', viewValue: 'Newest Arrivals' },
  ];
  // ==============================================================
    constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // ==============================================================
  // for Search Functionality
  onSearchTextEnterd(serachValue:string){
    this.searchText=serachValue;
    console.log(this.searchText);


  }
  // ==============================================================
  //for showing books filter by category
  filterSelector(selectedValue: string) {
    console.log('selector called ' + selectedValue);
    if (selectedValue == '') {
      this.getAllBooks();
    }
    if (selectedValue == 'Price : High to Low') {
      this.getCartBooksByUserId();
      this.bookService.getBookByPriceHighToLow().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
        console.log(this.bookList);
      });
    }
    if (selectedValue == 'Price : Low to High') {
      this.getCartBooksByUserId();
      this.bookService.getBookByPriceLowToHigh().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
        console.log(this.bookList);
      });
    }
    if (selectedValue == 'Newest Arrivals') {
      this.getCartBooksByUserId();
      this.bookService.getBookByNewestArrivel().subscribe((response: any) => {
        this.bookList = response.data;
        this.bookCount = this.bookList.length;
        console.log(this.bookList);
      });
    }
  }

  // ==============================================================
  // it will all  books available in bookstore
  getAllBooks() {
    this.getCartBooksByUserId();
    this.bookService.getAllbooks().subscribe((response: any) => {
      this.bookList = response.data;
      this.bookList.paginator = this.paginator;
      this.bookList.sort = this.sort;
      this.bookCount = this.bookList.length;
      console.log(this.bookList);
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
          console.log(response);
          this.ngOnInit();
        });
    } else {
      console.log('we are in add to cart btn an going for login page');
      this.router.navigate(['login']);
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

          console.log(this.userCart);
        });
    }
  }
}
