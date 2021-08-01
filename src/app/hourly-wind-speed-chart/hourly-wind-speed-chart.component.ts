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
  isDataAvailable: boolean = false;
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
          right: 5,
          pieces: [{
            label: 'Calm',
            gt: 0,
            lte: 1,
            color: '#00ffff'
          }, {
            label: 'Light air',
            gt: 1,
            lte: 5,
            color: '#00bfff'
          }, {
            label: 'Light breeze',
            gt: 5,
            lte: 11,
            color: '#0080ff'
          }, {
            label: 'Gentle breeze',
            gt: 11,
            lte: 19,
            color: '#0040ff'
          }, {
            label: 'Moderate breeze',
            gt: 19,
            lte: 28,
            color: '#00ff00'
          }, {
            label: 'Fresh breeze',
            gt: 28,
            lte: 38,
            color: '#00ad00'
          }, {
            label: 'Strong breeze',
            gt: 38,
            lte: 49,
            color: '#006600'
          }, {
            label: 'Moderate gale',
            gt: 49,
            lte: 61,
            color: '#cccc00'
          }, {
            label: 'Fresh gale',
            gt: 61,
            lte: 74,
            color: '#dca500'
          }, {
            label: 'Strong gale',
            gt: 74,
            lte: 88,
            color: '#ff0000'
          }, {
            label: 'Whole gale',
            gt: 88,
            lte: 102,
            color: '#a90000'
          }, {
            label: 'Storm',
            gt: 102,
            lte: 117,
            color: '#660000'
          }, {
            label: 'Hurricane',
            gt: 117,
            color: '#2f0000'
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
              yAxis: 1
            },{
              yAxis: 5
            }, {
              yAxis: 11
            }, {
              yAxis: 19
            }, {
              yAxis: 28
            }, {
              yAxis: 38
            }, {
              yAxis: 49
            }, {
              yAxis: 61
            }, {
              yAxis: 74
            }, {
              yAxis: 88
            }, {
              yAxis: 102
            }, {
              yAxis: 117
            }]
          }
        }
      };
    }, 1000);
  }

}
