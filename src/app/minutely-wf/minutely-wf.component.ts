import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";


@Component({
  selector: 'app-minutely-wf',
  templateUrl: './minutely-wf.component.html',
  styleUrls: ['./minutely-wf.component.css']
})
export class MinutelyWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;

  constructor() {

  }

  ngOnInit(): void {
  }

}
