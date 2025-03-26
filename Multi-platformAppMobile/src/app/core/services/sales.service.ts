import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = `${environment.apiUrl}/sales`;
  private ordersUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getSalesByClientId(clientId: string): Observable<any> {
    console.log('SalesService: Obteniendo compras para cliente:', clientId);
    
    const token = localStorage.getItem('authToken');
    console.log('Token encontrado:', token ? 'Sí' : 'No');
    
    if (!token) {
      console.error('No se encontró el token de autenticación');
      return throwError(() => new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    console.log('URL:', `${this.baseUrl}/get/sales/by/client/${clientId}`);
    console.log('Headers:', {
      'Content-Type': headers.get('Content-Type'),
      'Authorization': headers.get('Authorization')?.substring(0, 20) + '...'
    });

    return this.http.get<any>(`${this.baseUrl}/get/sales/by/client/${clientId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error en SalesService:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
          }
          return throwError(() => error);
        })
      );
  }

  getOrderDetails(orderId: string): Observable<any> {
    console.log('SalesService: Obteniendo detalles de la orden:', orderId);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró el token de autenticación');
      return throwError(() => new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.ordersUrl}/get/orders/by/id/${orderId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error obteniendo detalles de la orden:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
          }
          return throwError(() => new Error('Error al obtener los detalles de la orden'));
        })
      );
  }

  getProductById(productId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${environment.apiUrl}/products/get/products/by/id/${productId}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error obteniendo detalles del producto:', error);
          return throwError(() => error);
        })
      );
  }

  downloadTicket(orderId: string): Observable<Blob> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/pdf');

    return this.http.get(`${this.ordersUrl}/ticket/pdf/${orderId}`, {
      headers,
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        console.error('Error descargando el ticket:', error);
        return throwError(() => new Error('Error al descargar el ticket'));
      })
    );
  }
}
