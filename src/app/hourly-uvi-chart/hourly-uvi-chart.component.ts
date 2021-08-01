import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-hourly-uvi-chart',
  templateUrl: './hourly-uvi-chart.component.html',
  styleUrls: ['./hourly-uvi-chart.component.css']
})
export class HourlyUviChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;

  options: any;
  colorScheme: any;
  isDataAvailable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const xAxis: any[] = [];
      const yAxis: any[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherForecast?.hourly) {
        this.isDataAvailable = true;
        this.weatherForecast?.hourly?.forEach((x) => {
          let dateTime = datePipe.transform(x.dtLocal, 'MMM dd, HH:mm');

          xAxis.push(dateTime);
          yAxis.push(x.uvi);
        });
      }

      this.colorScheme = {
        color: ['#ff8000']
      };

      this.options = {
        tooltip: {},
        xAxis: {
          data: xAxis,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'UV index',
            type: 'bar',
            data: yAxis,
            animationDelay: (idx: number) => idx * 10,
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    }, 1000);
  }

}
