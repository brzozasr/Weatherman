import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-wh-uvi-chart',
  templateUrl: './wh-uvi-chart.component.html',
  styleUrls: ['./wh-uvi-chart.component.css']
})
export class WhUviChartComponent implements OnInit, AfterViewInit {

  @Input() weatherHistorical?: WeatherHistorical;
  isDataAvailable: boolean = false;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const xAxisData: any[] = [];
      const uvi: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');
      const decimalPipe: DecimalPipe = new DecimalPipe('pl-PL');
      const y = this.weatherHistorical?.aggUvi?.uviMax !== undefined ? this.weatherHistorical?.aggUvi?.uviMax : 0;
      const strMaxY = decimalPipe.transform(y, '1.0-0') ?? "0";
      const maxY = Number(strMaxY) + 1;


      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          xAxisData.push(dateTime);
          uvi.push(data.uvi);
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
            name: 'UV Index',
            type: 'bar',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              color: '#ff8000'
            },
            data: uvi
          }
        ]
      };
    }, 2500);
  }

}
