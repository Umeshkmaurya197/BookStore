export class WishlistModel{
  userId:number;
  bookId: Array<number>;

  constructor(userId:number,bookId: Array<number>){
    this.userId=userId;
    this.bookId=bookId;
  }
}
