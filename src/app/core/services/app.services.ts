import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DayWeatherResponse, IpResponse, LocationResponse, WeekWeatherResponse} from '../interfaces/service.interfaces';
import {environment} from '../../../environments/environment';

@Injectable()
export class AppService {
  private apiKey = environment.apiKey;
  private weatherUrl = 'http://api.openweathermap.org/data/2.5/';
  private locationUrl = 'http://ipwhois.app/json/';
  private ipUrl = 'https://jsonip.com';

  constructor(private http: HttpClient) {
  }

  getIp(): Observable<IpResponse> {
    return this.http.get<IpResponse>(this.ipUrl);
  }

  getLocation(ip: string): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(this.locationUrl + ip)
  }

  getWeather(location: string): Observable<WeekWeatherResponse> {
    return this.http.get<WeekWeatherResponse>(this.weatherUrl + `forecast?q=${location}&appid=${this.apiKey}`)
  }

  getCurrentWeather(location: string): Observable<DayWeatherResponse> {
    return this.http.get<DayWeatherResponse>(this.weatherUrl + `weather?q=${location}&appid=${this.apiKey}`)
  }
}
