import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {DatePipe} from "@angular/common";
import {Minutely} from "../forecast/model/minutely";


@Component({
  selector: 'app-minutely-wf',
  templateUrl: './minutely-wf.component.html',
  styleUrls: ['./minutely-wf.component.css']
})
export class MinutelyWfComponent implements OnInit, AfterViewInit {

  @Input() weatherPoint?: WeatherForecast;
  isPrecipitationInHour: boolean = false;
  options: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  isPrecipitation(list: Minutely[] | undefined): boolean {
    let isPrecipitation: boolean = false;
    if (list !== undefined) {
      list.forEach((value => {
        // @ts-ignore
        if (value.precipitation > 0) {
          isPrecipitation = true;
          return;
        }
      }));
    }

    return isPrecipitation;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isPrecipitationInHour = this.isPrecipitation(this.weatherPoint?.minutely);

      const xAxisData: any[] = [];
      const precipitation: (number | undefined)[] = [];
      const datePipe: DatePipe = new DatePipe('en-US');

      this.weatherPoint?.minutely?.forEach((data) => {
        let dateTime = datePipe.transform(data.dtLocal, 'HH:mm');

        xAxisData.push(dateTime);
        precipitation.push(data.precipitation);
      });

      this.options = {
        legend: {
          data: ['Precipitation'],
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'Precipitation',
            type: 'bar',
            data: precipitation,
            animationDelay: (idx: number) => idx * 10,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    }, 1000);
  }

}
