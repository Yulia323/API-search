export interface WeatherReport {
  main: {
    temp: number,
    humidity: number
  }
  weather: {
    main: string,
    icon: string
  }[]
  wind: {
    speed: number
  }
  dt_txt: string
}
