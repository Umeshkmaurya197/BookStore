import { CartModel } from 'src/app/Model/CartModel';
export class OrderModel{

  cart:CartModel;
  totalPrice:number;
  pin:number;
  locality:string;
  address:string;
  city:string;
  landmark:string;
  type:string;
  cancel:boolean;

  constructor(cart:CartModel,totalPrice:number,pin:number,locality:string,address:string,city:string,landmark:string,type:string,cancel:boolean){
    this.cart=cart
    this.totalPrice=totalPrice;
    this.pin=pin;
    this.locality=locality;
    this.address=address;
    this.city=city;
    this.landmark=landmark;
    this.type=type;
    this.cancel=cancel;
  }
}
