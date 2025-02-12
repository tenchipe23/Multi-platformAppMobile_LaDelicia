import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface RegisterResponse {
  token?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private REGISTER_URL = 'http://localhost:3002/api/users/create/user/mobile';
  private tokenKey = 'authToken';

  register(registerData: {
    username: string;
    name: string;
    first_surname: string;
    last_surname: string;
    phone_number: string;
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.post<RegisterResponse>(
      this.REGISTER_URL, 
      registerData, 
      { headers }
    ).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Ocurrió un error en el registro';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Por favor, verifica tu conexión.';
      } else if (error.status === 409) {
        errorMessage = 'El usuario o correo electrónico ya existe';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}