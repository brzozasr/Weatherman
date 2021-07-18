import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./service/forecast.service";
import {WeatherForecast} from "./model/weather-forecast";
import {map} from "rxjs/operators";
import {CurrentCoords} from "../utilities/current-coords";
import {CoordsForecastData} from "../utilities/coords-forecast-data";
import {CurrentCoordsForecastService} from "./service/current-coords-forecast.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  weatherPoint?: WeatherForecast;
  /*lat?: number;
  lon?: number;*/
  isSpinnerVisible: boolean = false;
  coordsData?: CoordsForecastData;

  constructor(private service: ForecastService,
              private currentCoords: CurrentCoords,
              private coordsForecastService: CurrentCoordsForecastService) {

  }

  ngOnInit(): void {
    // this.getCoordsWait(5200);
    this.getCoordsSubscribe();
  }

  /*getWeatherPoint(): void {
    if (this.lat && this.lon) {
      this.service.getWeatherForecastService(this.lat, this.lon)
        .subscribe((data) => {
            this.weatherPoint = data;
          },
          error => {
            this.weatherPoint = undefined;
          });
    }
  }*/

  getWeatherPoint(lat: number, lon: number): void {
    if (lat && lon) {
      this.service.getWeatherForecastService(lat, lon)
        .subscribe((data) => {
            this.weatherPoint = data;
          },
          error => {
            this.weatherPoint = undefined;
          });
    }
  }

  getCoordsSubscribe(): void {
    this.coordsForecastService.updateLocationForecastData(this.currentCoords.getCoords())
    this.coordsForecastService.locationForecastData
      .subscribe((coords) => {
          this.coordsData = coords;
          this.isSpinnerVisible = true;
          setTimeout(() => {
            if (coords.coordsArray[0] && coords.coordsArray[1]) {
              this.getWeatherPoint(coords.coordsArray[0], coords.coordsArray[1]);
            } else {
              this.getWeatherPoint(52.24, 20.99);
              // @ts-ignore
              this.coordsData?.locationName = 'Warszawa, PL';
            }
            this.isSpinnerVisible = false;
          }, 5200);
        },
        error => {
          console.log(error.error.message);
        });
  }

  /*getCoordsWait(waitTimeMs: number): void {
    this.coordsData = this.currentCoords.getCoords();
    this.isSpinnerVisible = true;
    setTimeout(() => {
      if (this.coordsData && this.coordsData.coordsArray.length === 2 &&
        this.coordsData.coordsArray[0] && this.coordsData.coordsArray[1]) {
        this.lat = this.coordsData.coordsArray[0];
        this.lon = this.coordsData.coordsArray[1];
        this.isSpinnerVisible = false;
      } else {
        this.lat = 52.24;
        this.lon = 20.99;
        this.isSpinnerVisible = false;
      }
      this.getWeatherPoint();
    }, waitTimeMs);
  }*/

}
