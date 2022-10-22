import { OrderModel } from './../../Model/OrderModel';
import { OrderService } from './../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../Services/cart.service';
import { CartModel } from './../../Model/CartModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  quantity: number = 1;
  myCart: boolean = false;
  customerDetails: boolean = false;
  userCart: CartModel = new CartModel(0, [], []);
  userPlaceOrder: OrderModel = new OrderModel(new CartModel(0, [], []),0,0,'','','','','',false);
  token: any;

  cartBookList: any = [];
  cartBookIdList: any = [];
  cartBookQuantityList: any = [];
  bookIdList: any;
  cartBookCount: number = 0;
  userData: any;
  userCartBookQuantity: any;
  totalPrice: any = [];
  Id: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
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
          console.log(this.cartBookList);
          this.getCartBooksByUserId();
        });
    } else {
      console.log('you should login fisrt ');
      this.router.navigate(['login']);
    }
  }

  //=======================================================================
  //get Cart Data By User id
  getCartBooksByUserId() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');

      this.cartService
        .getCartByUserId(this.token)
        .subscribe((response: any) => {
          this.userCart = response.data;
          this.userCartBookQuantity = response.data.quantity;
          this.userData = response.data.userData;
          this.bookIdList = response.data.bookId;
          this.cartBookCount = this.bookIdList.length;
          console.log(this.userCart);
        });
    }
  }

  //=======================================================================
  // decrease the quantity of books
  decrease(bookId: number) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .updateDecreaseQuanity(this.token, bookId)
        .subscribe((response: any) => {
          console.log(response);
          this.userCart = response.data;
          this.userCartBookQuantity = response.data.quantity;
          this.userData = response.data.userData;
          this.bookIdList = response.data.bookId;
          this.cartBookCount = this.bookIdList.length;
          this.ngOnInit();
        });
    }
  }

  //=======================================================================
  // increase the quantity of books
  increase(bookId: number) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .updateIncreaseQuantity(this.token, bookId)
        .subscribe((response: any) => {
          console.log(response);
          this.userCart = response.data;
          this.userCartBookQuantity = response.data.quantity;
          this.userData = response.data.userData;
          this.bookIdList = response.data.bookId;
          this.cartBookCount = this.bookIdList.length;
          this.ngOnInit();
        });
    }
  }

  //=======================================================================
  // remove books from cart
  removeBook(bookId: number) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.cartService
        .removeBookFromCart(this.token, bookId)
        .subscribe((response: any) => {
          console.log(response);
          this.userCart = response.data;
          this.userCartBookQuantity = response.data.quantity;
          this.userData = response.data.userData;
          this.bookIdList = response.data.bookId;
          this.cartBookCount = this.bookIdList.length;
          this.ngOnInit();
        });
    }
  }

  //=======================================================================
  //navigate to next step
  placeOrder() {
    if (this.myCart == false) {
      this.myCart = true;
    } else {
      this.myCart = false;
    }
  }

  //=======================================================================
  //continue to next step
  continue() {
    this.userPlaceOrder.cart = this.userCart;

    //Button functionality
    if (this.customerDetails == false) {
      this.customerDetails = true;
    } else {
      this.customerDetails = false;
    }
  }

  //=======================================================================
  //for Place order
  checkoutBtn() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.orderService
        .placeOrder(this.token, this.userPlaceOrder)
        .subscribe((response: any) => {
          this.Id = response.data.orderId;
          console.log('Order Id :' + this.Id);
          console.log(this.userData);
          this.router.navigate(['order-placed/' + this.Id]);
        });
    } else {
      console.log('You should go for login first');
      this.router.navigate(['login']);
    }
  }
}
