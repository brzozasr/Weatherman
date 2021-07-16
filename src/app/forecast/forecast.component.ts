import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./service/forecast.service";
import {WeatherForecast} from "./model/weather-forecast";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  weatherPoint?: WeatherForecast;
  lat?: number;
  lon?: number;

  constructor(private service: ForecastService) {

  }

  ngOnInit(): void {
    this.lat = 52.24;
    this.lon = 20.99;
    this.getWeatherPoint();
  }

  getWeatherPoint(): void {
    if (this.lat && this.lon) {
      this.service.getWeatherForecastService(this.lat, this.lon)
        .subscribe((data) => {
            this.weatherPoint = data;
          },
          error => {
            this.weatherPoint = undefined;
          });
    }
  }

}
