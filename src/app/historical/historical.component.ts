import { Component, OnInit } from '@angular/core';
import {CoordsHistoricalData} from "../utilities/coords-historical-data";
import {CurrentCoords} from "../utilities/current-coords";
import {HistoricalService} from "./service/historical.service";
import {CurrentCoordsHistoricalService} from "./service/current-coords-historical.service";
import {WeatherHistorical} from "./model/weather-historical";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {

  weatherPoint?: WeatherHistorical;
  isSpinnerVisible: boolean = false;
  coordsHistoricalData?: CoordsHistoricalData;

  constructor(private service: HistoricalService,
              private currentCoords: CurrentCoords,
              private coordsHistoricalService: CurrentCoordsHistoricalService) { }

  ngOnInit(): void {
    this.getCoordsSubscribe();
  }

  getWeatherPoint(lat: number, lon: number): void {
    if (lat && lon) {
      this.service.getWeatherHistoricalService(lat, lon)
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
    this.coordsHistoricalService.locationHistoricalData
      .subscribe((coords) => {
          this.coordsHistoricalData = coords;
          this.isSpinnerVisible = true;
          setTimeout(() => {
            if (coords.coordsArray[0] && coords.coordsArray[1]) {
              localStorage.setItem('lsCoordsHistoricalData', JSON.stringify(coords));
              this.getWeatherPoint(coords.coordsArray[0], coords.coordsArray[1]);
            } else {
              this.getWeatherPoint(52.24, 20.99);
              // @ts-ignore
              this.coordsHistoricalData?.coordsArray = [52.24, 20.99];
              // @ts-ignore
              this.coordsHistoricalData?.locationName = 'Warszawa, PL';
              // @ts-ignore
              this.coordsHistoricalData?.status = 'Forced location set to "Warszawa, PL"';
              localStorage.setItem('lsCoordsHistoricalData', JSON.stringify(this.coordsHistoricalData));
            }
            this.isSpinnerVisible = false;
          }, 5500);
        },
        error => {
          console.log(error.error.message);
        });
  }

}
