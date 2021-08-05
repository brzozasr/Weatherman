import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";
import {DatePipe} from "@angular/common";
import {PrecipitationHistoricalData} from "./model/precipitation-historical-data";

@Component({
  selector: 'app-wh-precipitation-chart',
  templateUrl: './wh-precipitation-chart.component.html',
  styleUrls: ['./wh-precipitation-chart.component.css']
})
export class WhPrecipitationChartComponent implements OnInit, AfterViewInit {

  @Input() weatherHistorical?: WeatherHistorical;
  isDataAvailable: boolean = false;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      const dataSet: PrecipitationHistoricalData[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      if (this.weatherHistorical?.hourly) {
        this.isDataAvailable = true;
        this.weatherHistorical?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          if (data.rain || data.snow) {
            let rain = data.rain ? data.rain.h1 : '-';
            let snow = data.snow ? data.snow.h1 : '-';
            let dataPrecipitation = new PrecipitationHistoricalData(dateTime, rain, snow);
            dataSet.push(dataPrecipitation);
          } else {
            let dataPrecipitation = new PrecipitationHistoricalData(dateTime, '-', '-');
            dataSet.push(dataPrecipitation);
          }
        });
      }

      this.options = {
        legend: {},
        tooltip: {
          trigger: 'axis',
        },
        dataset: {
          source: dataSet
        },

        xAxis: {type: 'category'},
        yAxis: {},
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
            name: 'Rain (mm)',
            type: 'bar',
            itemStyle: {
              color: '#0080ff'
            },
          },
          {
            name: 'Snow (mm)',
            type: 'bar',
            itemStyle: {
              color: '#6ec8ff'
            },
          }
        ]
      };

    }, 2500);
  }

}
