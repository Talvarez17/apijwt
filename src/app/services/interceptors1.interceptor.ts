import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class Interceptors1Interceptor implements HttpInterceptor {

  constructor(public router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') || '';

    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      });

    }
    return next.handle(request).pipe(
      catchError(err => {

        if ([401, 403].includes(err.status)) {
          // 401: El Token no fue valido
          // 403: El Usuario no tiene permisos

          //Deslogueo
          localStorage.clear();
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        //console.error(err);
        Swal.fire({
          title: 'Su tiempo de sesión ha caducado',
          text: "Vuelva a iniciar sesión",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: 'red',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })
        
        return throwError(error);
      })
    );
  }
}
