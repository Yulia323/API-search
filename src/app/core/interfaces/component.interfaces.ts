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
