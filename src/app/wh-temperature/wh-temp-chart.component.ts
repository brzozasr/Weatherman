import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {WeatherHistorical} from "../historical/model/weather-historical";

@Component({
  selector: 'app-wh-temp-chart',
  templateUrl: './wh-temp-chart.component.html',
  styleUrls: ['./wh-temp-chart.component.css']
})
export class WhTempChartComponent implements OnInit, AfterViewInit {

  @Input() weatherHistorical?: WeatherHistorical;

  isDataAvailable: boolean = false;
  options: any;
  colorScheme: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      const xAxisData: any[] = [];
      const temp: (number | undefined)[] = [];
      const feelsLike: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          xAxisData.push(dateTime);
          temp.push(data.temp);
          feelsLike.push(data.feelsLike);
        });
      }

      this.colorScheme = {
        color: ['#cc0000', '#0000cc']
      };

      this.options = {
        legend: {
          data: ['Temperature (°C)', 'Feels Like (°C)'],
          itemGap: 10
        },
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
          data: xAxisData
        },
        yAxis: {
          type: 'value',
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
            name: 'Temperature (°C)',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: temp
          },
          {
            name: 'Feels Like (°C)',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: feelsLike
          }
        ]
      };
    }, 2500);
  }

}
