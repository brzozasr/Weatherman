import {Component, Input, OnInit} from '@angular/core';
import {WeatherHistorical} from "../historical/model/weather-historical";

@Component({
  selector: 'app-historical-charts',
  templateUrl: './historical-charts.component.html',
  styleUrls: ['./historical-charts.component.css']
})
export class HistoricalChartsComponent implements OnInit {

  @Input() weatherPoint?: WeatherHistorical;

  constructor() { }

  ngOnInit(): void {
  }

}
