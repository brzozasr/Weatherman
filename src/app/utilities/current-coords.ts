import {Injectable} from '@angular/core';
import {CoordsData} from "./coords-data";

@Injectable({
  providedIn: 'root'
})

export class CurrentCoords {

  locationStatus: string = '';
  lat?: number;
  lon?: number;

  constructor(private coordsData: CoordsData) {
  }

  private locationSuccess(position: GeolocationPosition): CoordsData {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.locationStatus = '';
    this.coordsData.coordsArray = [this.lat, this.lon];
    this.coordsData.status = this.locationStatus;
    console.info(`${this.coordsData.coordsArray}`);

    return this.coordsData;
  }

  private locationError(): CoordsData {
    this.locationStatus = 'Unable to retrieve your location';
    console.warn(this.locationStatus);
    this.coordsData.coordsArray = [];
    this.coordsData.status = this.locationStatus;

    return this.coordsData;
  }

  getCoords(): CoordsData {
    if (!navigator.geolocation) {
      this.locationStatus = 'Geolocation is not supported by your browser';
      console.warn(this.locationStatus);
      this.coordsData.coordsArray = [];
      this.coordsData.status = this.locationStatus;

      return this.coordsData;
    } else {
      this.locationStatus = 'Locating…';
      console.info(this.locationStatus);
      navigator.geolocation.getCurrentPosition(position => {
          this.coordsData = this.locationSuccess(position);
        },
        error => {
          this.coordsData = this.locationError();
        });
      return this.coordsData;
    }
  }


}
