import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStateService } from './order-state.service';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;	
  private productUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient, private orderStateService: OrderStateService) {}

  getOrderById(orderId: string): Observable<Order> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Order>(`${this.baseUrl}/get/orders/by/id/${orderId}`, { headers });
  }

  getOrdersByClientId(clientId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/get/orders/by/client/${clientId}`, { headers });
  }

  createOrder(order: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.baseUrl}/create/order`, order, { headers });
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<any>(`${this.baseUrl}/updateStatus/${orderId}`, { status }, { headers });
  }

  getProductById(productId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.productUrl}/get/products/by/id/${productId}`, { headers });
  }
}