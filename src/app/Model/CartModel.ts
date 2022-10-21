export class CartModel {
  userId: number
  bookId: Array<number>;
  quantity: Array<number>;

  constructor(userId: number, bookId: Array<number>, quantity: Array<number>) {
    this.userId = userId;
    this.bookId = bookId;
    this.quantity = quantity;
  }
}
