import { Component, OnInit } from '@angular/core';
import {CurrentCoords} from "../utilities/current-coords";

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.css']
})
export class GeoLocationComponent implements OnInit {

  lat?: number;
  lon?: number;

  constructor(private currentCoords: CurrentCoords) { }

  ngOnInit(): void {
  }

  getLocationCoords(): void {
    let coordsData = this.currentCoords.getCoords();
    if (coordsData.coordsArray.length === 2) {
      this.lat = coordsData.coordsArray[0];
      this.lon = coordsData.coordsArray[1];
    } else {
      this.lat = 52.24;
      this.lon = 20.99;
    }
  }

}
