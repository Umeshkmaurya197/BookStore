import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../Model/OrderModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl=environment.host;
  constructor(private http:HttpClient) { }

  placeOrder(token:string,order:OrderModel){
    return this.http.post(`${this.baseUrl}/order/place-order?token=`+token,order);
  }

  getOrderDetails(token:string){
    return this.http.get(`${this.baseUrl}/order/get-order-data?token=`+token);
  }
}
