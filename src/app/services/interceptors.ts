import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    //Debo de agregar mi componente despues
    constructor(public router: Router){ }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token') || '';
        if (token) {
            const index = request.url.indexOf('https://api.cloudinary.com');
            if (index != 0) {
                request = request.clone({
                    headers: new HttpHeaders({
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${ token }`
                    })
            });
        }

    }
        // return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

        //         if (event instanceof HttpResponse) {
        //             //console.log(event);
        //             //console.log(event.body.response);
        //             //Manejar la respuesta
        //             let headers: HttpHeaders = event.headers;

        //             if (headers.get('Authorization')) {
        //                 const Token = headers.get('Authorization').replace(/^Bearer\s+/, '');
        //                 localStorage.setItem('accessToken', JSON.stringify(Token));
        //             }
        //         }
        //     }
        // ),
        catchError(err => {

            if ([401, 403].includes(err.status)) {
                // 401: El Token no fue valido
                // 403: El Usuario no tiene permisos
                
                //Deslogueo
                this.router.navigate(['/login']);            }

            const error = (err && err.error && err.error.message) || err.statusText;
            //console.error(err);
            return throwError(error);
        })
    }
}