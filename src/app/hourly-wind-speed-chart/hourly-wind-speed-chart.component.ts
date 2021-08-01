import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-hourly-wind-speed-chart',
  templateUrl: './hourly-wind-speed-chart.component.html',
  styleUrls: ['./hourly-wind-speed-chart.component.css']
})
export class HourlyWindSpeedChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  isDataAvailable: any;
  options: any;

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
          yAxis.push(x.windSpeedKm);
        });
      }

      this.options = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '10%'
        },
        xAxis: {
          data: xAxis.map(function (item: any) {
            return item[0];
          })
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          startValue: '2014-06-01'
        }, {
          type: 'inside'
        }],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 50,
            color: '#93CE07'
          }, {
            gt: 50,
            lte: 100,
            color: '#FBDB0F'
          }, {
            gt: 100,
            lte: 150,
            color: '#FC7D02'
          }, {
            gt: 150,
            lte: 200,
            color: '#FD0100'
          }, {
            gt: 200,
            lte: 300,
            color: '#AA069F'
          }, {
            gt: 300,
            color: '#AC3B2A'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Wind speed (km/h)',
          type: 'line',
          data: yAxis.map(function (item: any) {
            return item[1];
          }),
          markLine: {
            silent: true,
            lineStyle: {
              color: '#333'
            },
            data: [{
              yAxis: 50
            }, {
              yAxis: 100
            }, {
              yAxis: 150
            }, {
              yAxis: 200
            }, {
              yAxis: 300
            }]
          }
        }
      };
    }, 1000);
  }

}
