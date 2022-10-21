import { CartModel } from './../Model/CartModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl=environment.host;
  constructor(private http:HttpClient) { }

  addBookToCart(token:string,cartModel:CartModel){
    return this.http.post(`${this.baseUrl}/cart/add-cart?token=`+token,cartModel);
  }

  getCartBookByUserId(token:string){
    return this.http.get(`${this.baseUrl}/cart/get-cart-books-by-user-id?token=`+token);
  }

  getCartByUserId(token:string){
    return this.http.get(`${this.baseUrl}/cart/get-cart-by-user-id?token=`+token);
  }

  getBook(bookId:any){
    return this.http.get(`${this.baseUrl}/book/get-book-by-id/${bookId}`);
  }

  updateIncreaseQuantity(token:string,bookId:number){
    return this.http.get(`${this.baseUrl}/cart/increase-cart-quantity-by-user-id/`+bookId+`?token=`+token);
  }
  updateDecreaseQuanity(token:string,bookId:number){
    return this.http.get(`${this.baseUrl}/cart/decrease-cart-quantity-by-user-id/`+bookId+`?token=`+token);
  }
  removeBookFromCart(token:string,bookId:number){
    return this.http.get(`${this.baseUrl}/cart/remove-book-from-cart-by-user-id/`+bookId+`?token=`+token);
  }
}
