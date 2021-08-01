import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe, DecimalPipe} from "@angular/common";
import {PrecipitationData} from "./models/precipitation-data";

@Component({
  selector: 'app-hourly-precipitation-chart',
  templateUrl: './hourly-precipitation-chart.component.html',
  styleUrls: ['./hourly-precipitation-chart.component.css']
})
export class HourlyPrecipitationChartComponent implements OnInit, AfterViewInit {

  @Input() weatherForecast?: WeatherForecast;
  colorScheme: any;
  options: any;
  isDataAvailable: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      const dataSet: PrecipitationData[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');
      const decimalPipe: DecimalPipe = new DecimalPipe('pl-PL');

      if (this.weatherForecast?.hourly) {
        this.isDataAvailable = true;
        this.weatherForecast?.hourly?.forEach((data) => {
          let dateTime = datePipe.transform(data.dtLocal, 'MMM dd, HH:mm');

          if (data.rain || data.snow) {
            let rain = data.rain ? data.rain.h1 : '-';
            let snow = data.snow ? data.snow.h1 : '-';
            let percentage = data.pop ? data.pop * 100 : 0;
            let pop = decimalPipe.transform(percentage, '1.0-0');
            let dataPrecipitation = new PrecipitationData(dateTime, rain, snow, pop);
            dataSet.push(dataPrecipitation);
          } else {
            let dataPrecipitation = new PrecipitationData(dateTime, '-', '-', '-');
            dataSet.push(dataPrecipitation);
          }
        });
      }

      this.colorScheme = {
        color: ['#0080ff', '#6ec8ff']
      };

      this.options = {
        legend: {},
        tooltip: {},
        dataset: {
          source: dataSet
        },

        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          {
            name: 'Rain (mm)',
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              offset: [8, 5],
              rotate: 90,
              color: '#000',
              fontSize: 8.5,
              formatter: '{@pop}%'
            },
          },
          {
            name: 'Snow (mm)',
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              offset: [8, 5],
              rotate: 90,
              color: '#000',
              fontSize: 8.5,
              formatter: '{@pop}%'
            },
          }
        ]
      };
    }, 1000);
  }

}
