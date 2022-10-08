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

  constructor() {}

  ngOnInit(): void {}

  //navigate to next step
  placeOrder() {
    if (this.myCart == false) {
      this.myCart = true;
    } else {
      this.myCart = false;
    }
  }
  //navigate to next step
  continue() {
    if (this.customerDetails == false) {
      this.customerDetails = true;
    } else {
      this.customerDetails = false;
    }
  }

  //increase and decrease the quantity of books
  decrease() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
    }
  }
  increase() {
    this.quantity = this.quantity + 1;
  }
  removeQuantity() {
    this.quantity = 0;
  }
}
