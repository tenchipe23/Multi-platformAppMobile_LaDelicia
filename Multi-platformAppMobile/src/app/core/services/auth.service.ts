import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:3001/api/auths/login/user';
  private tokenKey = 'authToken'; 

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string = '', email: string = '', password: string): Observable<any> {
    const loginData = {
      username: username || undefined,
      email: email || undefined,
      password
    };

    return this.httpClient.post<any>(this.LOGIN_URL, loginData);
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