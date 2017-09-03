
import {Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

export interface User {
  _id: string
}

@Injectable()
export class UserService {
  BASE_URL: string = environment.apiUrl;
  options: object = { withCredentials: true };
  params = new URLSearchParams();

  constructor(private http: Http) { }

  handleError(e) {
    console.error("Error en la llamada a la API");
    return Observable.throw(e.json().message);
  }

  show(id: string): Observable<object> {
    return this.http.get(`${this.BASE_URL}/api/user/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id: string, user): Observable<object> {
    return this.http.put(`${this.BASE_URL}/api/user/${id}`, user, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id: string): Observable<object> {
    return this.http.delete(`${this.BASE_URL}/api/user/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
