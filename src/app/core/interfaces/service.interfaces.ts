import {WeatherReport} from './component.interfaces';

export interface LocationResponse {
  ip: string;
  city: string;
  country: string;
  success: boolean;
}

export interface IpResponse {
  ip: string;
  country: string;
  'geo-ip': string;
}

export interface WeekWeatherResponse {
  city: { id: number, name: string, country: string };
  cnt: number;
  cod: string;
  list: WeatherReport[];
  message: number;
}

export interface DayWeatherResponse extends WeatherReport {
  name: string;
}

