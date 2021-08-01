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
          data: xAxis
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
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 10
        }],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 1,
            color: '#00ffff'
          }, {
            gt: 1,
            lte: 5,
            color: '#00bfff'
          }, {
            gt: 5,
            lte: 11,
            color: '#0080ff'
          }, {
            gt: 11,
            lte: 19,
            color: '#0040ff'
          }, {
            gt: 19,
            lte: 28,
            color: '#00ff00'
          }, {
            gt: 28,
            lte: 38,
            color: '#00ad00'
          }, {
            gt: 38,
            lte: 49,
            color: '#006600'
          }, {
            gt: 49,
            lte: 61,
            color: '#e6e600'
          }, {
            gt: 61,
            lte: 74,
            color: '#dca500'
          }, {
            gt: 74,
            lte: 88,
            color: '#ff0000'
          }, {
            gt: 88,
            lte: 102,
            color: '#a90000'
          }, {
            gt: 102,
            lte: 117,
            color: '#660000'
          }, {
            gt: 117,
            color: '#732626'
          }],
          outOfRange: {
            color: '#808080'
          }
        },
        series: {
          name: 'Wind speed (km/h)',
          type: 'line',
          data: yAxis,
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
