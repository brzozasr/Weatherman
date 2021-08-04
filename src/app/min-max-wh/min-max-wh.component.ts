import {Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";

@Component({
  selector: 'app-min-max-wh',
  templateUrl: './min-max-wh.component.html',
  styleUrls: ['./min-max-wh.component.css']
})
export class MinMaxWhComponent implements OnInit {

  @Input() weatherPoint?: WeatherHistorical;

  constructor() { }

  ngOnInit(): void {
  }

}
