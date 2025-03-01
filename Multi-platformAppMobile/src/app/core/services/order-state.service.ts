import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private ordersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public orders$: Observable<any[]> = this.ordersSubject.asObservable();

  constructor() {}

  setOrders(orders: any[]) {
    this.ordersSubject.next(orders);
  }

  addOrder(order: any) {
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, order]);
  }
}