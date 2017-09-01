import {Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

export interface Place {
  _id: string
}

@Injectable()
export class PlaceService {
  BASE_URL: string = environment.apiUrl;
  options: object = { withCredentials: true };
  params = new URLSearchParams();

  constructor(private http: Http) { }

  handleError(e) {
    console.error("Error en la llamada a la API");
    return Observable.throw(e.json().message);
  }

  indexAtlas() {
    return this.http.get(`${this.BASE_URL}/api/atlas`, this.options)
      .map((res) => res.json());
  }

  show(id: string): Observable<object> {
    return this.http.get(`${this.BASE_URL}/api/places/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id: string, place): Observable<object> {
    return this.http.put(`${this.BASE_URL}/api/places/${id}`, place, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id: string): Observable<object> {
    return this.http.delete(`${this.BASE_URL}/api/places/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  convertGms2Dec(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W")
      dd *= -1;

    return dd;
  }

  createFavorite(userId:string, placeId:string):Observable<object> {
    return this.http.post(`${this.BASE_URL}/api/favorite`, {userId, placeId}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
