import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl = 'http://localhost/sistemasP1JWTA/fakeapi2.php/';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost/sistemasP1JWTA/fakeapi2.php');
  }

  post(action: string, datos: any) {
    return this.http.post(`${this.baseUrl}${action}`, datos);
  }

  delete(datos: any) {
    return this.http.delete(`${this.baseUrl}${datos}`);
  }
}
