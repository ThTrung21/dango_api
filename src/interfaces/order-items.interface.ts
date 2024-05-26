export interface OrderItem {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  totalPrice: number;

  createdAt?: Date;
  updatedAt?: Date;
}
