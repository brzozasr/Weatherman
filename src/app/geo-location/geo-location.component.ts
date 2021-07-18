import {Component, Input, OnInit} from '@angular/core';
import {CurrentCoords} from "../utilities/current-coords";
import {DataType} from "../utilities/data-type";
import {CurrentCoordsForecastService} from "../forecast/service/current-coords-forecast.service";
import {CoordsForecastData} from "../utilities/coords-forecast-data";
import {CoordsHistoricalData} from "../utilities/coords-historical-data";
import {CurrentCoordsHistoricalService} from "../historical/service/current-coords-historical.service";

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.css']
})
export class GeoLocationComponent implements OnInit {

  @Input() coordsData?: CoordsForecastData | CoordsHistoricalData;

  constructor(private currentCoords: CurrentCoords,
              private currentCoordsForecastService: CurrentCoordsForecastService,
              private currentCoordsHistoricalService: CurrentCoordsHistoricalService) { }

  ngOnInit(): void {
  }

  getLocationCoords(): void {
    let type: DataType;
    if (this.coordsData?.dataType !== undefined) {
      type = this.coordsData.dataType;
    } else {
      type = DataType.FORECAST;
    }

    let coordsData = this.currentCoords.getCoords(type);
    if (coordsData.coordsArray.length === 2 && coordsData.coordsArray[0] && coordsData.coordsArray[1]) {
      this.selectService(type, coordsData);
      this.currentCoordsForecastService.updateLocationForecastData(coordsData);
    } else {
      coordsData.coordsArray = [52.24, 20.99];
      coordsData.locationName = 'Warszawa, PL';
      coordsData.status = 'CurrentCoordsComponent returned an invalid value';
      this.selectService(type, coordsData);
    }
  }

  selectService(dataType: DataType, coordsData: CoordsForecastData | CoordsHistoricalData): void {
    if (dataType === DataType.FORECAST) {
      this.currentCoordsForecastService.updateLocationForecastData(coordsData);
    } else {
      this.currentCoordsHistoricalService.updateLocationHistoricalData(coordsData);
    }
  }

}
