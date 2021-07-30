import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe} from "@angular/common";
import LinearGradient from 'zrender/lib/graphic/LinearGradient';


@Component({
  selector: 'app-hourly-pressure-chart',
  templateUrl: './hourly-pressure-chart.component.html',
  styleUrls: ['./hourly-pressure-chart.component.css']
})
export class HourlyPressureChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  colorScheme: any;
  options: any;
  isDataAvailable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const dataAxis: any[] = [];
      const data: any[] = [];
      const yMax = 1100;
      const dataShadow = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherForecast?.hourly) {
        this.isDataAvailable = true;
        this.weatherForecast?.hourly?.forEach((x) => {
          let dateTime = datePipe.transform(x.dtLocal, 'MMM dd, HH:mm');

          dataAxis.push(dateTime);
          data.push(x.pressure);
        });
      }


      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      this.options = {
        tooltip: {},
        xAxis: {
          data: dataAxis,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          min: 800,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
            },
          },
        },
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false,
          },
          {
            name: 'Pressure (hPa)',
            type: 'bar',
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              }
            },
            label: {
              show: true,
              position: 'inside',
              rotate: 90,
              color: '#fff',
              fontSize: 10,
              formatter: '{c} hPa',
            },
            data: data,
          },
        ],
      };

    }, 1000);
  }

}
