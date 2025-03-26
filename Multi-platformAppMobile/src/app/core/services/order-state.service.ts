import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() {}

  getOrders(): Order[] {
    return this.ordersSubject.value;
  }

  setOrders(orders: Order[]): void {
    this.ordersSubject.next(orders);
  }

  addOrder(order: Order): void {
    const currentOrders = this.getOrders();
    this.ordersSubject.next([...currentOrders, order]);
  }

  updateOrder(orderId: string, updatedOrder: Order): void {
    const currentOrders = this.getOrders();
    const index = currentOrders.findIndex(order => order.id === orderId);
    if (index !== -1) {
      currentOrders[index] = updatedOrder;
      this.ordersSubject.next([...currentOrders]);
    }
  }

  removeOrder(orderId: string): void {
    const currentOrders = this.getOrders();
    this.ordersSubject.next(currentOrders.filter(order => order.id !== orderId));
  }

  clearOrders(): void {
    this.ordersSubject.next([]);
  }
}