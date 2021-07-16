import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./service/forecast.service";
import {WeatherForecast} from "./model/weather-forecast";
import {map} from "rxjs/operators";
import {CurrentCoords} from "../utilities/current-coords";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  weatherPoint?: WeatherForecast;
  lat?: number;
  lon?: number;
  isSpinnerVisible: boolean = false;

  constructor(private service: ForecastService,
              private currentCoords: CurrentCoords) {

  }

  ngOnInit(): void {
    this.getCoordsWait(5000);
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

  getCoordsWait(waitTimeMs: number): void {
    let coordsData = this.currentCoords.getCoords();
    this.isSpinnerVisible = true;
    setTimeout(() => {
      if (coordsData.coordsArray.length === 2 &&
        coordsData.coordsArray[0] && coordsData.coordsArray[1]) {
        this.lat = coordsData.coordsArray[0];
        this.lon = coordsData.coordsArray[1];
        this.isSpinnerVisible = false;
      } else {
        this.lat = 52.24;
        this.lon = 20.99;
        this.isSpinnerVisible = false;
      }
      this.getWeatherPoint();
    }, waitTimeMs);
  }

}
