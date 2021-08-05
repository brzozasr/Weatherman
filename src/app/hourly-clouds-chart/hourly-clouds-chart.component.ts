import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-hourly-clouds-chart',
  templateUrl: './hourly-clouds-chart.component.html',
  styleUrls: ['./hourly-clouds-chart.component.css']
})
export class HourlyCloudsChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  isDataAvailable: any;
  options: any;
  colorScheme: boolean = false;

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
          yAxis.push(x.clouds);
        });
      }

      this.options = {
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          max: 120
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 10
        }],
        series: [
          {
            name: 'Clouds (%)',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(16, 128, 188)'
            },
            areaStyle: {
              color: new LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(15, 128, 189)'
              }, {
                offset: 1,
                color: 'rgb(185, 226, 249)'
              }])
            },
            data: yAxis
          }
        ]
      };

    }, 1000);
  }

}
