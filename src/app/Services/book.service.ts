import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl=environment.host;
  constructor(private http:HttpClient) { }

  getAllbooks(){
    return this.http.get(`${this.baseUrl}/book/get-all-books`);
  }

  getBookByPriceLowToHigh(){
    return this.http.get(`${this.baseUrl}/book/book-sorting-by-price-ascending`);
  }
  getBookByPriceHighToLow(){
    return this.http.get(`${this.baseUrl}/book/book-sorting-by-price-descending`);
  }
  getBookByNewestArrivel(){
    return this.http.get(`${this.baseUrl}/book/book-sorting-by-newest-arrival`);
  }



}
