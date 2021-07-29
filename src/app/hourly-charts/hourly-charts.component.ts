import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-hourly-charts',
  templateUrl: './hourly-charts.component.html',
  styleUrls: ['./hourly-charts.component.css']
})
export class HourlyChartsComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;

  constructor() { }

  ngOnInit(): void {
  }

}
