import {Injectable} from "@angular/core";
import {DataType} from "./data-type";

@Injectable({
  providedIn: 'root'
})

export class CoordsForecastData {
  coordsArray: number[] = new Array<number>(2);
  locationName: string = '';
  status: string = '';
  readonly dataType: DataType = DataType.FORECAST;

  constructor() {
  }
}
