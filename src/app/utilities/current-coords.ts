import {Injectable} from '@angular/core';
import {CoordsForecastData} from "./coords-forecast-data";
import {LocationService} from "./service/location.service";

@Injectable({
  providedIn: 'root'
})

export class CurrentCoords {

  locationName: string = '';
  locationStatus: string = '';
  lat?: number;
  lon?: number;

  constructor(private coordsForecastData: CoordsForecastData,
              private locationService: LocationService) {
  }

  private locationSuccess(position: GeolocationPosition): CoordsForecastData {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.locationStatus = '';
    this.coordsForecastData.coordsArray = [this.lat, this.lon];
    this.getLocationNameFromCoords(this.lat, this.lon);
    this.coordsForecastData.status = this.locationStatus;

    setTimeout(() => {
      this.coordsForecastData.locationName = this.locationName;
    }, 1400);

    console.info(`${this.coordsForecastData.coordsArray}`);

    return this.coordsForecastData;
  }

  private locationError(): CoordsForecastData {
    this.locationStatus = 'Unable to retrieve your location';
    console.warn(this.locationStatus);
    this.coordsForecastData.coordsArray = [];
    this.coordsForecastData.locationName = '';
    this.coordsForecastData.status = this.locationStatus;

    return this.coordsForecastData;
  }

  getCoords(): CoordsForecastData {
    if (!navigator.geolocation) {
      this.locationStatus = 'Geolocation is not supported by your browser';
      console.warn(this.locationStatus);
      this.coordsForecastData.coordsArray = [];
      this.coordsForecastData.locationName = '';
      this.coordsForecastData.status = this.locationStatus;

      return this.coordsForecastData;
    } else {
      this.locationStatus = 'Locating…';
      console.info(this.locationStatus);
      navigator.geolocation.getCurrentPosition(position => {
          this.coordsForecastData = this.locationSuccess(position);
        },
        error => {
          this.coordsForecastData = this.locationError();
        });
      return this.coordsForecastData;
    }
  }

  getLocationNameFromCoords(lat: number, lon: number): void {
    this.locationService.getReverseGeocoding(lat, lon)
      .subscribe((data) => {
          if (data) {
            let locName = CurrentCoords.setLocalityName(data.locality, data.city, data.countryCode);
            this.locationName = locName !== '' ? locName : 'There is no such location';
          }
        },
        error => console.error('HTTP Error', error),
        () => console.log('Reverse geocoding HTTP request completed.'));
  }

  getCoordsData(): CoordsForecastData {
    return this.coordsForecastData;
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
