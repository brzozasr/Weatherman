import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [52.231821, 21.020862]; // Warsaw

  options = {
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1.0,
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 9,
    center: this.centroid
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onMapReady(map: L.Map) {
    // get a local reference to the map as we need it later
    this.map = map;

    this.setLabels(map, 52.2298, 21.0118, 31.5, 'Warszawa', '01n');
  }

  onMapMoveEnd(): void {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    console.log(bounds?.getWest());
    console.log(bounds?.getSouth());
    console.log(bounds?.getEast());
    console.log(bounds?.getNorth());
    console.log(zoomMap);

    this.setLabels(this.map, 52.2298, 21.0118, 31.5, 'Warszawa', '01n');
  }

  setLabels(map: L.Map | undefined, lat: number, lng: number, temperature: number, city: string, img: string): void {
    if (map !== undefined) {
      map.closePopup();

      let temp = Math.round(temperature);

      let popup = L.popup({
        offset: L.point(45, 35),
        closeButton: false,
        autoClose: false,
        className: 'custom-popup'
      })
        .setLatLng([lat, lng])
        .setContent(`<div style="display: flex; flex-flow: row nowrap;"><div style="padding: 0; background-color: #b3b3b3; border-radius: 4px 0 0 4px;"><img src="http://openweathermap.org/img/wn/${img}@2x.png" alt="" style="height: 20px;"></div><div style="background-color: #233766; padding: 3px;">${temp}</div><div style="background-color: #dcb936; padding: 3px; border-radius: 0 4px 4px 0;">${city}</div></div>`)
        .openOn(map);
    }
  }
}
