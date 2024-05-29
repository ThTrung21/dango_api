export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export interface Order {
  id: number;
  status: OrderStatus;
  userId: number;
  orderAddress: string;
  orderName: string;
  orderPhone: string;

  createdAt?: Date;
  updatedAt?: Date;
}
