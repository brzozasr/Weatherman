import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";
import {DatePipe, DecimalPipe} from "@angular/common";
import LinearGradient from "zrender/lib/graphic/LinearGradient";

@Component({
  selector: 'app-wh-dew-point-chart',
  templateUrl: './wh-dew-point-chart.component.html',
  styleUrls: ['./wh-dew-point-chart.component.css']
})
export class WhDewPointChartComponent implements OnInit, AfterViewInit {

  @Input() weatherHistorical?: WeatherHistorical;
  isDataAvailable: boolean = false;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const xAxisData: any[] = [];
      const dewPoint: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');
      const decimalPipe: DecimalPipe = new DecimalPipe('pl-PL');
      const y = this.weatherHistorical?.aggDewPoint?.dewPointMax !== undefined ? this.weatherHistorical?.aggDewPoint?.dewPointMax : 0;
      const strMaxY = decimalPipe.transform(y, '1.0-0') ?? "0";
      const maxY = Number(strMaxY) + 1;

      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          xAxisData.push(dateTime);
          dewPoint.push(data.dewPoint);
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
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          max: maxY
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
            name: 'Dew Point (°C)',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              color: 'rgb(64, 0, 128)'
            },
            areaStyle: {
              color: new LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(102, 0, 204)'
              }, {
                offset: 1,
                color: 'rgb(217, 179, 255)'
              }])
            },
            data: dewPoint
          }
        ]
      };

    }, 2500);
  }

}
