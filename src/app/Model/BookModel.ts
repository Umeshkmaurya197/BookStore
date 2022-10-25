export class BookModel{
 bookId :number;
 bookName :string;
 authorName :string;
 bookDescription :string;
 bookImg :string;
 price :number;
 quantity :number;

 constructor( bookId :number,bookName :string,authorName :string,bookDescription :string,bookImg :string,price :number,quantity :number){
    this.bookId = bookId;
    this.bookName = bookName;
    this.authorName = authorName;
    this.bookDescription = bookDescription;
    this.bookImg = bookImg;
    this.price = price;
    this.quantity = quantity;

 }

}
