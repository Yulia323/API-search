import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Url } from '../interfaces/app.interfaces';

interface LocationResponse extends Url {
  success: boolean;
}

@Injectable()
export class AppService {
  private url = 'http://ipwhois.app/json/';

  constructor(private http: HttpClient) {
  }

  getLocation(ip: string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(this.url + ip)
  }
}
