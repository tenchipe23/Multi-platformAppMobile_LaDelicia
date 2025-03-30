import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.API_URL}/products/get/products`; // Nueva URL de la API

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Obtén el token correcto del local storage
    if (!token) {
      throw new Error('Token no encontrado en el local storage');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Se añade el header de Content-Type
    });
  }
  
getAllProducts(): Observable<any> {
  return this.http.get(this.apiUrl, { 
    headers: this.getHeaders()  // Aquí se utiliza el método getHeaders para obtener las cabeceras
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

getProductById(productId: string): Observable<any> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get(`${environment.API_URL}/products/get/products/by/id/${productId}`, { headers });
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