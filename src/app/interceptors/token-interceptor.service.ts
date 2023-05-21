import { Injectable, Injector } from '@angular/core';
import { catchError } from "rxjs/operators";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService, private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken()

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      req = clonedReq;
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


//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let authService = this.injector.get(AuthService);
//     let tokenizeReq = req.clone({
//         setHeaders: {
//             Authorization:`Bearer ${authService.getAccessToken()}`
//         }
//     })
    
//     return next.handle(tokenizeReq);
// }
  

}
