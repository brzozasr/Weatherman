import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-wh-pressure-chart',
  templateUrl: './wh-pressure-chart.component.html',
  styleUrls: ['./wh-pressure-chart.component.css']
})
export class WhPressureChartComponent implements OnInit, AfterViewInit {

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
      const pressure: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          xAxisData.push(dateTime);
          pressure.push(data.pressure);
        });
      }

      this.colorScheme = {
        color: ['#00bfff']
      };

      this.options = {
        tooltip: {
          trigger: 'axis'
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
          boundaryGap: [0, '100%'],
          min: 800,
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 20
        }],
        series: [
          {
            name: 'Pressure (hPa)',
            type: 'bar',
            symbol: 'none',
            data: pressure
          }
        ]
      };

    }, 2500);
  }

}
