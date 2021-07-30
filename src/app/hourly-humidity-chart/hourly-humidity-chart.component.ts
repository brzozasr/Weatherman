import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-hourly-humidity-chart',
  templateUrl: './hourly-humidity-chart.component.html',
  styleUrls: ['./hourly-humidity-chart.component.css']
})
export class HourlyHumidityChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  options: any;
  colorScheme: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

    const xAxis: any[] = [];
    const yAxis: any[] = [];
    const datePipe: DatePipe = new DatePipe('en-US');

    this.weatherForecast?.hourly?.forEach((x) => {
      let dateTime = datePipe.transform(x.dtLocal, 'MMM dd, HH:mm');

      xAxis.push(dateTime);
      yAxis.push(x.humidity);
    });

    this.options = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Humidity (%)',
        data: yAxis,
        type: 'line',
        smooth: true
      }]
    };
    }, 1000);
  }

}
