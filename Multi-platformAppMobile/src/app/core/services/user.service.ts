import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/users/get/users/by`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserData(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${userId}`, { headers }).pipe(
      map(response => response)
    );
  }

  getUserById(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${userId}`, { headers }).pipe(
      map(response => response)
    );
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/users/update/users/${userId}`, userData, { headers }).pipe(
      map(response => response)
    );
  }
}
