import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3100/api/products/get/products'; // Nueva URL de la API

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Obtén el token correcto del local storage
    if (!token) {
      throw new Error('Token no encontrado en el local storage');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json' ,
      'Content-Type': 'application/json'
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl, { 
      
      headers: this.getHeaders()

      }).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return throwError(error);
      }),
      tap((response) => {
        console.log('Respuesta de la API:', response); // Aquí puedes verificar si la respuesta es correcta
      })
    );
  }
  

  getProductById(id: number): Observable<any> {
    const url = `http://localhost:3100/api/products/get/products/by/id/${id}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al obtener el producto:', error);
        return throwError(error);
      })
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al crear el producto:', error);
        return throwError(error);
      })
    );
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el producto:', error);
        return throwError(error);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto:', error);
        return throwError(error);
      })
    );
  }
}