import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable()
export class MobileHttpInterceptor implements HttpInterceptor {
  constructor(private platform: Platform) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Detailed logging
    console.log('Interceptor Request Details:', {
      originalUrl: request.url,
      platform: this.platform.platforms(),
      isAndroid: this.platform.is('android')
    });

    // Modify request for Android
    if (this.platform.is('android')) {
      // Replace localhost with Android emulator localhost
      const androidUrl = request.url
        .replace('http://localhost:3100', 'http://10.0.2.2:3100')
        .replace('http://localhost:3100', 'http://10.0.2.2:3100');

      const modifiedRequest = request.clone({ 
        url: androidUrl,
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Modified Android Request:', {
        modifiedUrl: modifiedRequest.url
      });

      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Android HTTP Interceptor Error:', {
            url: modifiedRequest.url,
            status: error.status,
            message: error.message,
            fullError: error
          });
          return throwError(() => error);
        })
      );
    }

    // For non-Android platforms
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Interceptor Error:', {
          url: request.url,
          status: error.status,
          message: error.message,
          fullError: error
        });
        return throwError(() => error);
      })
    );
  }
}