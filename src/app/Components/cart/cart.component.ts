import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  myCart:boolean=false;
  customerDetails:boolean=false;


  constructor() { }

  ngOnInit(): void {
  }

  placeOrder(){
    if(this.myCart==false){
      this.myCart=true;
    }else{
      this.myCart=false;
    }
  }
  continue(){
    if(this.customerDetails==false){
      this.customerDetails=true;
    }
    else{
      this.customerDetails=false;
    }
  }

}
