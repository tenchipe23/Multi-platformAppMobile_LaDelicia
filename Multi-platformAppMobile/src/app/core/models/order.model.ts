export interface Order {
  id: string;
  clientId: string;
  products: OrderProduct[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}
