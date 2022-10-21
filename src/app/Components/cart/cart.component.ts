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
  userPlaceOrder: OrderModel = new OrderModel(
    new CartModel(0, [], []),
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    false
  );
  token: any;

  cartBookList: any = [];
  cartBookIdList: any = [];
  cartBookQuantityList: any = [];
  bookIdList: any;
  cartBookCount: number = 0;
  userData: any;
  userCartBookQuantity: any;
  totalPrice: any = [];
  Id:any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getCartBooks();
  }

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

  //continue to next step
  continue() {
    this.userPlaceOrder.cart = this.userCart;

    //Button functionality
    if (this.customerDetails == false) {
      this.customerDetails = true;
    } else {
      this.customerDetails = false;
    }
    // console.log( "total price");

    // total price
    // for(let i=0;i<this.cartBookList.length;i++){
    //   this.totalPrice+=this.cartBookList.price[i]*this.userCart.quantity[i];
    // }

    // console.log("user Place Order address : "+this.userPlaceOrder.address);
    // console.log("user Place Order cancel : "+this.userPlaceOrder.cancel+"\n");
    // console.log("user Place Order bookId : "+this.userPlaceOrder.cart.bookId);
    // console.log("user Place Order userId : "+this.userData.userId);
    // console.log("user Place Order bookquantity : "+this.userCartBookQuantity+"\n");
    // console.log("user Place Order city : "+this.userPlaceOrder.city);
    // console.log("user Place Order landmark : "+this.userPlaceOrder.landmark);
    // console.log("user Place Order locality : "+this.userPlaceOrder.locality);
    // console.log("user Place Order pin : "+this.userPlaceOrder.pin);
    // console.log("user Place Order totalprice : "+this.userPlaceOrder.totalPrice);
    // console.log("user Place Order type : "+this.userPlaceOrder.type);
  }

  //for Place order
  checkoutBtn() {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.orderService
        .placeOrder(this.token, this.userPlaceOrder)
        .subscribe((response: any) => {
          this.Id = response.orderId;
          console.log(response.orderId);
          console.log(this.userData);
          // this.router.navigate(['order-placed/:Id',this.Id]);
          // this.router.navigateByUrl('order-placed/:Id',response.orderId);
        });
    } else {
      console.log('You should go for login first');
      this.router.navigate(['login']);
    }
  }

  //navigate to next step
  placeOrder() {
    if (this.myCart == false) {
      this.myCart = true;
    } else {
      this.myCart = false;
    }
  }

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

  // remove books from cart
  removeQuantity(bookId: number) {
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
}
