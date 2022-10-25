import { WishlistModel } from './../Model/WishlistModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl=environment.host;
  constructor(private http:HttpClient) { }

  createWishlist(token:String,userWishlistModel:WishlistModel){
    return this.http.post('http://localhost:8080/book-store/wishlist/add-to-wishlist?token='+token,userWishlistModel);
  }
  getWishlistByUserId(token:String){
    return this.http.get('http://localhost:8080/book-store/wishlist/get-wishlist?token='+token);
  }
  getWishlistBooksByUserId(token:String){
    return this.http.get('http://localhost:8080/book-store/wishlist/get-wishlist-books-by-user-id?token='+token);
  }
  removeBookFromWishlist(bookId:number,token:string){
    return this.http.delete('http://localhost:8080/book-store/wishlist/remove-book-from-wishlist/'+bookId+'?token='+token);
  }
}
