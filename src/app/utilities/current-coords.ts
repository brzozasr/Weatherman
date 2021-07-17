import {Injectable} from '@angular/core';
import {CoordsData} from "./coords-data";
import {LocationService} from "./service/location.service";

@Injectable({
  providedIn: 'root'
})

export class CurrentCoords {

  locationName: string = '';
  locationStatus: string = '';
  lat?: number;
  lon?: number;

  constructor(private coordsData: CoordsData,
              private location: LocationService) {
  }

  private locationSuccess(position: GeolocationPosition): CoordsData {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.locationStatus = '';
    this.coordsData.coordsArray = [this.lat, this.lon];
    this.getLocationNameFromCoords(this.lat, this.lon);
    this.coordsData.status = this.locationStatus;

    setTimeout(() => {
      this.coordsData.locationName = this.locationName;
    }, 1400);

    console.info(`${this.coordsData.coordsArray}`);

    return this.coordsData;
  }

  private locationError(): CoordsData {
    this.locationStatus = 'Unable to retrieve your location';
    console.warn(this.locationStatus);
    this.coordsData.coordsArray = [];
    this.coordsData.locationName = '';
    this.coordsData.status = this.locationStatus;

    return this.coordsData;
  }

  getCoords(): CoordsData {
    if (!navigator.geolocation) {
      this.locationStatus = 'Geolocation is not supported by your browser';
      console.warn(this.locationStatus);
      this.coordsData.coordsArray = [];
      this.coordsData.locationName = '';
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

  getLocationNameFromCoords(lat: number, lon: number): void {
    this.location.getReverseGeocoding(lat, lon)
      .subscribe((data) => {
          if (data) {
            let locName = CurrentCoords.setLocalityName(data.locality, data.city, data.countryCode);
            this.locationName = locName !== '' ? locName : 'There is no such location';
          }
        },
        error => console.error('HTTP Error', error),
        () => console.log('Reverse geocoding HTTP request completed.'));
  }

  private static setLocalityName(locality: string | undefined,
                                 city: string | undefined, countryCode: string | undefined): string {
    let localityBool = locality !== '' && locality !== undefined;
    let cityBool = city !== '' && city !== undefined;
    let countryCodeBool = countryCode !== '' && countryCode !== undefined;

    switch (true) {
      case (localityBool && cityBool && countryCodeBool):
        return `${locality}, ${city}`.trim();
      case (localityBool && cityBool && !countryCodeBool):
        return `${locality}, ${city}`.trim();
      case (localityBool && !cityBool && !countryCodeBool):
        return `${locality}`.trim();
      case (!localityBool && cityBool && countryCodeBool):
        return `${city}, ${countryCode}`.trim();
      case (!localityBool && !cityBool && countryCodeBool):
        return `${countryCode}`.trim();
      case (!localityBool && cityBool && !countryCodeBool):
        return `${city}`.trim();
      case (localityBool && !cityBool && countryCodeBool):
        return `${locality}, ${countryCode}`.trim();
      case (!localityBool && !cityBool && !countryCodeBool):
        return ``;
      default:
        return ``;
    }
  }

}
