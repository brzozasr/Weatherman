import {Component} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CurrentCoords} from "./utilities/current-coords";
import {DataType} from "./utilities/data-type";
import {CurrentCoordsForecastService} from "./forecast/service/current-coords-forecast.service";
import {CurrentCoordsHistoricalService} from "./historical/service/current-coords-historical.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weatherman';

  constructor(private currentCoordsForecastService: CurrentCoordsForecastService,
              private currentCoordsHistoricalService: CurrentCoordsHistoricalService,
              private currentCoords: CurrentCoords) {
  }

  reloadDataCart($event: MatTabChangeEvent): void {
    if ($event.tab.textLabel === "Weather Forecast" && $event.index === 1) {
      this.reloadTabData(DataType.FORECAST);
    }
  }

  private reloadTabData(dataType: DataType): void {
    let data = this.currentCoords.getCoordsData(dataType);
    let retrievedData: string | null;
    if (dataType === DataType.FORECAST) {
      retrievedData = localStorage.getItem('lsCoordsForecastData');
      localStorage.removeItem('lsCoordsForecastData');
    } else {
      retrievedData = localStorage.getItem('lsCoordsHistoricalData');
      localStorage.removeItem('lsCoordsHistoricalData');
    }

    if (retrievedData !== null) {
      data = JSON.parse(retrievedData);
    } else {
      data.coordsArray = [52.24, 20.99];
      data.locationName = 'Warszawa, PL';
      data.status = 'CurrentCoordsComponent returned an invalid value';
    }

    if (dataType === DataType.FORECAST) {
      this.currentCoordsForecastService.updateLocationForecastData(data);
    } else {
      this.currentCoordsHistoricalService.updateLocationHistoricalData(data);
    }
  }
}
