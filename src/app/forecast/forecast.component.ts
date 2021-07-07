import { Component, OnInit } from '@angular/core';
import {ForecastService} from "./service/forecast.service";
import {Observable} from "rxjs";
import {WeatherForecast} from "./model/weather-forecast";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  weatherPoint$?: Observable<WeatherForecast>;
  weatherPoint?: WeatherForecast;
  lat?: number;
  lon?: number;

  constructor(private service: ForecastService) {
    this.lat = 52.24;
    this.lon = 20.99;
  }

  ngOnInit(): void {
    this.getWeatherPoint();
  }

  getWeatherPoint(): void {
    if (this.lat && this.lon) {
      this.service.getWeatherForecastService(this.lat, this.lon)
        .subscribe((data) => {
          this.weatherPoint = data;
        });
    }
  }

}
