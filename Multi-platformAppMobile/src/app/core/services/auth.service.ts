import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'https://8245-189-161-134-145.ngrok-free.app/api/auths/login/user';
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
  
    return this.httpClient.post<any>(this.LOGIN_URL, loginData, httpOptions);
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