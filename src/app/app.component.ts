import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from './core/services/app.services';
import {forkJoin, Subject, switchMap, takeUntil} from 'rxjs';
import {
  DayWeatherResponse,
  IpResponse,
  LocationResponse, WeekWeatherResponse
} from './core/interfaces/service.interfaces';
import {WeatherReport} from './core/interfaces/component.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnDestroy, OnInit {
  calculateTemp = (temp: number) => temp ? Math.round(temp - 273) : '0';
  findCurrentDay = () => this.weekWeatherInfo.find(day => day[0].dt_txt == this.currentWeatherInfo.dt_txt);

  myDate: Date = new Date();
  searchInput: string = '';
  onDestroy$ = new Subject();
  weekWeatherInfo: Array<WeatherReport[]> = [];
  isFetching = false;
  currentWeatherInfo: DayWeatherResponse = {
    name: 'Undefined',
    dt_txt: '',
    main: {
      temp: 0,
      humidity: 0
    },
    weather:
      [{main: '', icon: ''}],
    wind: {
      speed: 0
    },
  };
  lastSearch = '';

  constructor(private appService: AppService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initWeather()
  }

  dayOrNight() {
    return this.myDate.getHours() > 6 && this.myDate.getHours() < 20 ? 'day' : 'night';
  }

  initWeather() {
    this.isFetching = true;
    this.appService.getIp()
      .pipe(
        switchMap((value: IpResponse) => this.appService.getLocation(value.ip)),
        switchMap((location: LocationResponse) => this.searchWeather(location.city + ',' + location.country)),
        takeUntil(this.onDestroy$))
      .subscribe(
        (weather: [WeekWeatherResponse, DayWeatherResponse]) => {
          console.log(weather)
          this.isFetching = false;
          this.setWeather(weather);
        },
        () => {
          alert('Your location or city was not found.')
          this.isFetching = false;
          this.cd.markForCheck();
        }
      );
  }

  searchWeather(search: string) {
    const weather = this.appService.getWeather(search);
    const currentWeather = this.appService.getCurrentWeather(search);
    return forkJoin([weather, currentWeather])
  }

  setWeather(weather: [WeekWeatherResponse, DayWeatherResponse]) {
    const [weekWeather, currentWeather] = weather;
    const mappedWeekWeather: any = {}
    for (const day of weekWeather.list) {
      const date = day.dt_txt.split(' ')[0]
      if (mappedWeekWeather[date]) mappedWeekWeather[date].push(day)
      else mappedWeekWeather[date] = [day]
    }
    this.weekWeatherInfo = Object.values(mappedWeekWeather)
    this.currentWeatherInfo = {...currentWeather, dt_txt: weekWeather.list[0].dt_txt};
    this.cd.markForCheck();
  }

  search() {
    if (this.searchInput === this.lastSearch || !this.searchInput) return;
    this.isFetching = true;
    this.searchWeather(this.searchInput).pipe(takeUntil(this.onDestroy$))
      .subscribe((weather) => {
          this.lastSearch = this.searchInput;
          this.searchInput = '';
          this.isFetching = false;
          this.setWeather(weather);
        },
        (error => {
          alert(error.error.message);
          this.isFetching = false;
          this.cd.markForCheck();
        })
      )
  }

  changeDay(day: WeatherReport) {
    const newDay = {...day, name: this.currentWeatherInfo.name};
    this.currentWeatherInfo = newDay;
  }

  ngOnDestroy() {
    this.onDestroy$.next('')
  }
}
