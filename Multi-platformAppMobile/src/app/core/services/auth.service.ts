import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = `${environment.apiUrl}/auths/login/user`;
  private tokenKey = 'authToken';
  private userIdKey = 'userId';

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
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
          }
          if (response.user && response.user._id) {
            this.setUserId(response.user._id);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Error de red o del cliente.');
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
      return throwError(error.error.message || 'Error al iniciar sesión.');
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.router.navigate(['/login']);
  }
}