import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CoordsForecastData} from "../../utilities/coords-forecast-data";
import {CurrentCoords} from "../../utilities/current-coords";

@Injectable({
  providedIn: 'root'
})
export class CurrentCoordsForecastService {

  private coordsSource = new BehaviorSubject<CoordsForecastData>(this.currentCoords.getCoords());
  locationForecastData = this.coordsSource.asObservable();

  constructor(private currentCoords: CurrentCoords) { }

  updateLocationForecastData(data: CoordsForecastData): void {
    this.coordsSource.next(data);
  }
}
