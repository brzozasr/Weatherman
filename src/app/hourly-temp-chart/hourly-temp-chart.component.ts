import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-hourly-temp-chart',
  templateUrl: './hourly-temp-chart.component.html',
  styleUrls: ['./hourly-temp-chart.component.css']
})
export class HourlyTempChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;

  options: any;
  colorScheme: any;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      const xAxisData: any[] = [];
      const temp: (number | undefined)[] = [];
      const feelsLike: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      this.weatherForecast?.hourly?.forEach((data) => {
        let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

        xAxisData.push(dateTime);
        temp.push(data.temp);
        feelsLike.push(data.feelsLike);
      });

      this.colorScheme = {
        color: ['#cc0000', '#0000cc']
      };

      this.options = {
        legend: {
          data: ['Temperature', 'Feels like'],
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'Temperature',
            type: 'bar',
            data: temp,
            animationDelay: (idx: number) => idx * 10,
          },
          {
            name: 'Feels like',
            type: 'bar',
            data: feelsLike,
            animationDelay: (idx: number) => idx * 10 + 100,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    }, 1000);
  }

}
