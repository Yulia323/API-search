import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WeatherReport} from '../../core/interfaces/component.interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  @Input('weekWeather') weekWeatherInfo: Array<WeatherReport[]> = []

  chartData = () => [{data: this.weekWeatherInfo.map(day => day[0].main.humidity), label: 'Humidity'}]
  chartLabels = () => this.weekWeatherInfo.map(day => day[0].dt_txt.split(' ')[0]);
  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() {
  }
}
