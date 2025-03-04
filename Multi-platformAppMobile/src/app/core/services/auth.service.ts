import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = `${environment.API_URL}/auths/login/user`;
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string = '', email: string = '', password: string): Observable<any> {
    const loginData: any = {
      username: username || undefined,
      email: email || undefined,
      password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<any>(this.LOGIN_URL, loginData, httpOptions)
      .pipe(
        catchError(this.handleError) // Captura el error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red.
      console.error('An error occurred:', error.error.message);
      return throwError('Error de red o del cliente.');
    } else {
      // El backend devolvió un código de respuesta no exitoso.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`); // Log del error completo
      return throwError(error.error.message || 'Error al iniciar sesión.'); // Extrae el mensaje de error
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}