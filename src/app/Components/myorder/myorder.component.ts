import { CartService } from './../../Services/cart.service';
import { BookService } from './../../Services/book.service';
import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss'],
})
export class MyorderComponent implements OnInit {
  token: any;
  orderDate!: Date;
  BookIdList: any = [];
  bookList: any = [];
  cartBookList: any = [];
  userCart: any;
  userCartBookQuantity: any;
  bookIdList: any;
  userData: any;
  cartBookCount: any;
  constructor(
    private orderService: OrderService,
    // private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.getCartBooks();
  }

  //=======================================================================
  //getAllBooks
  getCartBooks() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .getCartBookByUserId(this.token)
        .subscribe((response: any) => {


          this.cartBookList = response.data;
        });
    } else {
      this.router.navigate(['login']);
    }
  }

  getOrder() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.orderService
        .getOrderDetails(this.token)
        .subscribe((response: any) => {
          console.log(response);

          this.orderDate = response.data.date;
          this.BookIdList = response.data.cart.bookId;
        });
    }
  }
}
