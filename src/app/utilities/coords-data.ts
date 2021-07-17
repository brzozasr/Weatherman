import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CoordsData {
  coordsArray: number[] = new Array<number>(2);
  locationName: string = '';
  status: string = '';

  constructor() {
  }
}
