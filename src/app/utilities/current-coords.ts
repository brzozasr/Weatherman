import {Injectable} from '@angular/core';
import {CoordsForecastData} from "./coords-forecast-data";
import {LocationService} from "./service/location.service";
import {CoordsHistoricalData} from "./coords-historical-data";
import {DataType} from "./data-type";

@Injectable({
  providedIn: 'root'
})

export class CurrentCoords {

  locationName: string = '';
  locationStatus: string = '';
  lat?: number;
  lon?: number;

  constructor(private coordsForecastData: CoordsForecastData,
              private coordsHistoricalData: CoordsHistoricalData,
              private locationService: LocationService) {
  }

  private locationSuccess(position: GeolocationPosition, dataType: DataType): CoordsForecastData | CoordsHistoricalData {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.locationStatus = 'Success';

    if (dataType === DataType.FORECAST) {
      this.coordsForecastData.coordsArray = [this.lat, this.lon];
      this.getLocationNameFromCoords(this.lat, this.lon);
      this.coordsForecastData.status = this.locationStatus;
    } else {
      this.coordsHistoricalData.coordsArray = [this.lat, this.lon];
      this.getLocationNameFromCoords(this.lat, this.lon);
      this.coordsHistoricalData.status = this.locationStatus;
    }

    setTimeout(() => {
      if (dataType === DataType.FORECAST) {
        this.coordsForecastData.locationName = this.locationName;
        console.info(`${this.coordsForecastData.coordsArray}`);
      } else {
        this.coordsHistoricalData.locationName = this.locationName;
        console.info(`${this.coordsHistoricalData.coordsArray}`);
      }
    }, 1400);

    if (dataType === DataType.FORECAST) {
      return this.coordsForecastData;
    } else {
      return this.coordsHistoricalData;
    }
  }

  private locationError(dataType: DataType): CoordsForecastData | CoordsHistoricalData {
    this.locationStatus = 'Unable to retrieve your location';
    console.warn(this.locationStatus);

    if (dataType === DataType.FORECAST) {
      this.coordsForecastData.coordsArray = [];
      this.coordsForecastData.locationName = 'Failure';
      this.coordsForecastData.status = this.locationStatus;

      return this.coordsForecastData;
    } else {
      this.coordsHistoricalData.coordsArray = [];
      this.coordsHistoricalData.locationName = 'Failure';
      this.coordsHistoricalData.status = this.locationStatus;

      return this.coordsHistoricalData;
    }
  }

  getCoords(dataType: DataType): CoordsForecastData | CoordsHistoricalData {
    if (!navigator.geolocation) {
      this.locationStatus = 'Geolocation is not supported by your browser';
      console.warn(this.locationStatus);

      if (dataType === DataType.FORECAST) {
        this.coordsForecastData.coordsArray = [];
        this.coordsForecastData.locationName = '';
        this.coordsForecastData.status = this.locationStatus;

        return this.coordsForecastData;
      } else {
        this.coordsHistoricalData.coordsArray = [];
        this.coordsHistoricalData.locationName = '';
        this.coordsHistoricalData.status = this.locationStatus;

        return this.coordsHistoricalData;
      }
    } else {
      console.info('Locating…');
      navigator.geolocation.getCurrentPosition(position => {
          if (dataType === DataType.FORECAST) {
            this.coordsForecastData = this.locationSuccess(position, dataType);
          } else {
            this.coordsHistoricalData = this.locationSuccess(position, dataType);
          }
        },
        error => {
          if (dataType === DataType.FORECAST) {
            this.coordsForecastData = this.locationError(dataType);
          } else {
            this.coordsHistoricalData = this.locationError(dataType);
          }
          console.log(error.message);
        });

      if (dataType === DataType.FORECAST) {
        return this.coordsForecastData;
      } else {
        return this.coordsHistoricalData;
      }
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
        error => console.error('HTTP Error', error.message),
        () => console.log('Reverse geocoding HTTP request completed.'));
  }

  getCoordsData(dataType: DataType): CoordsForecastData | CoordsHistoricalData {
    if (dataType === DataType.FORECAST) {
      return this.coordsForecastData;
    } else {
      return this.coordsHistoricalData;
    }
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
