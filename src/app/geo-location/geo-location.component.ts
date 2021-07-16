import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.css']
})
export class GeoLocationComponent implements OnInit {

  locationStatus: string = '';
  lat?: number;
  lon?: number;

  constructor() { }

  ngOnInit(): void {
  }

  locationSuccess(position: GeolocationPosition): void {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.locationStatus = '';
    console.log(`${this.lat}, ${this.lon}`);
  }

  locationError(): void {
    this.locationStatus = 'Unable to retrieve your location';
    console.log(this.locationStatus);
  }

  getLocationCoords(): void {
    if(!navigator.geolocation) {
      this.locationStatus = 'Geolocation is not supported by your browser';
      console.log(this.locationStatus);
    } else {
      this.locationStatus = 'Locating…';
      console.log(this.locationStatus);
      navigator.geolocation.getCurrentPosition(position => {
        this.locationSuccess(position);
      },
        error => {
        this.locationError();
        });
    }
  }
}
