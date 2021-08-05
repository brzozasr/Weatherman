import {Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";

@Component({
  selector: 'app-bar-img-wh',
  templateUrl: './bar-img-wh.component.html',
  styleUrls: ['./bar-img-wh.component.css']
})
export class BarImgWhComponent implements OnInit {

  @Input() weatherPoint?: WeatherHistorical;

  constructor() { }

  ngOnInit(): void {
  }

}
