import {Component, OnInit} from '@angular/core';
import {ForecastService} from "./service/forecast.service";
import {WeatherForecast} from "./model/weather-forecast";
import {CurrentCoords} from "../utilities/current-coords";
import {CoordsForecastData} from "../utilities/coords-forecast-data";
import {CurrentCoordsForecastService} from "./service/current-coords-forecast.service";
import {DataType} from "../utilities/data-type";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  weatherPoint?: WeatherForecast;
  isSpinnerVisible: boolean = false;
  coordsForecastData?: CoordsForecastData;

  constructor(private service: ForecastService,
              private currentCoords: CurrentCoords,
              private coordsForecastService: CurrentCoordsForecastService) {

  }

  ngOnInit(): void {
    this.getCoordsSubscribe();
  }

  getWeatherPoint(lat: number, lon: number): void {
    if (lat && lon) {
      this.service.getWeatherForecastService(lat, lon)
        .subscribe((data) => {
            this.weatherPoint = data;
          },
          error => {
            this.weatherPoint = undefined;
            console.log(error.error.message);
          });
    }
  }

  getCoordsSubscribe(): void {
    this.coordsForecastService.updateLocationForecastData(this.currentCoords.getCoords(DataType.FORECAST));
    this.coordsForecastService.locationForecastData
      .subscribe((coords) => {
          this.coordsForecastData = coords;
          this.isSpinnerVisible = true;
          setTimeout(() => {
            if (coords.coordsArray[0] && coords.coordsArray[1]) {
              this.getWeatherPoint(coords.coordsArray[0], coords.coordsArray[1]);
            } else {
              this.getWeatherPoint(52.24, 20.99);
              // @ts-ignore
              this.coordsForecastData?.locationName = 'Warszawa, PL';
            }
            this.isSpinnerVisible = false;
          }, 5000);
        },
        error => {
          console.log(error.error.message);
        });
  }

}
