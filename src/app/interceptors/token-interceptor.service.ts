import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken()

    if (token) {
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
    
  }

  

}
