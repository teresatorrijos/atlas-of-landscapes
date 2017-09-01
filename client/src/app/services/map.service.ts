import {Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

export interface Maps {
  _id: string
}

@Injectable()
export class MapService {
  BASE_URL: string = environment.apiUrl;
  options: object = { withCredentials: true };
  params = new URLSearchParams();

  constructor(private http: Http) { }

indexMaps() {
  return this.http.get(`${this.BASE_URL}/api/allmaps`, this.options)
    .map((res) => res.json());
}

}
