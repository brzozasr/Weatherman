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
    this.coordsForecastService.updateLocationForecastData(this.currentCoords.getCoords(DataType.FORECAST));
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
    this.coordsForecastService.locationForecastData
      .subscribe((coords) => {
          this.coordsForecastData = coords;
          this.isSpinnerVisible = true;
          setTimeout(() => {
            if (coords.coordsArray[0] && coords.coordsArray[1]) {
              localStorage.setItem('lsCoordsForecastData', JSON.stringify(coords));
              this.getWeatherPoint(coords.coordsArray[0], coords.coordsArray[1]);
            } else {
              this.getWeatherPoint(52.24, 20.99);
              // @ts-ignore
              this.coordsForecastData?.coordsArray = [52.24, 20.99];
              // @ts-ignore
              this.coordsForecastData?.locationName = 'Warszawa, PL';
              // @ts-ignore
              this.coordsForecastData?.status = 'Forced location set to "Warszawa, PL"';
              localStorage.setItem('lsCoordsForecastData', JSON.stringify(this.coordsForecastData));
            }
            this.isSpinnerVisible = false;
          }, 5500);
        },
        error => {
          console.log(error.error.message);
        });
  }

}
