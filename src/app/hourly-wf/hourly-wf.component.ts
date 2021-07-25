import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-hourly-wf',
  templateUrl: './hourly-wf.component.html',
  styleUrls: ['./hourly-wf.component.css']
})
export class HourlyWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;

  constructor() { }

  ngOnInit(): void {
  }

}
