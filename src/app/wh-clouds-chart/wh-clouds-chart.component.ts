import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";
import {DatePipe} from "@angular/common";
import LinearGradient from "zrender/lib/graphic/LinearGradient";

@Component({
  selector: 'app-wh-clouds-chart',
  templateUrl: './wh-clouds-chart.component.html',
  styleUrls: ['./wh-clouds-chart.component.css']
})
export class WhCloudsChartComponent implements OnInit, AfterViewInit {

  @Input() weatherHistorical?: WeatherHistorical;
  isDataAvailable: boolean = false;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const xAxisData: any[] = [];
      const clouds: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          xAxisData.push(dateTime);
          clouds.push(data.clouds);
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
          max: 120
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
            name: 'Clouds (%)',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              color: 'rgb(0, 102, 204)'
            },
            areaStyle: {
              color: new LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(102, 102, 102)'
              }, {
                offset: 1,
                color: 'rgb(153, 255, 255)'
              }])
            },
            data: clouds
          }
        ]
      };

    }, 2500);
  }

}
