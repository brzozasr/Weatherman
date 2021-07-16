import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-current-wf',
  templateUrl: './current-wf.component.html',
  styleUrls: ['./current-wf.component.css']
})
export class CurrentWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;

  constructor() { }

  ngOnInit(): void {
  }

}
