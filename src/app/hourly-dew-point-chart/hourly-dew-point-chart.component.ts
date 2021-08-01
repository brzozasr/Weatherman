import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-hourly-dew-point-chart',
  templateUrl: './hourly-dew-point-chart.component.html',
  styleUrls: ['./hourly-dew-point-chart.component.css']
})
export class HourlyDewPointChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  colorScheme: any;
  options: any;
  isDataAvailable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const xAxis: any[] = [];
      const yAxis: any[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherForecast?.hourly) {
        this.isDataAvailable = true;
        this.weatherForecast?.hourly?.forEach((x) => {
          let dateTime = datePipe.transform(x.dtLocal, 'MMM dd, HH:mm');

          xAxis.push(dateTime);
          yAxis.push(x.dewPoint);
        });
      }

      this.colorScheme = {
        color: ['#8a81ce']
      };

      this.options = {
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Dew Point (%)',
          data: yAxis,
          type: 'line',
          smooth: true,
          areaStyle: {}
        }]
      };
    }, 1000);
  }

}
