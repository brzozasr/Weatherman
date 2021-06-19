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
    layers:[L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1.0,
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom: 9,
    center: this.centroid
  };

  constructor() { }

  ngOnInit(): void {
  }

  onMapReady(map: L.Map) {
    // get a local reference to the map as we need it later
    this.map = map;

    this.setLabels(map, 52.231821, 21.020862, 31.5, 'Warszawa');
  }

  onMapMoveEnd(): void {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    console.log(bounds?.getWest());
    console.log(bounds?.getSouth());
    console.log(bounds?.getEast());
    console.log(bounds?.getNorth());
    console.log(zoomMap);

    this.setLabels(this.map, 52.231821, 21.020862, 31.5, 'Warszawa');
  }

  setLabels(map: L.Map | undefined, lat: number, lng: number, temperature: number, city: string): void {
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
        .setContent(`<div style="display: flex; flex-flow: row nowrap;"><div style="background-color: #2c3e50; font-weight: bold; padding: 3px;">${temp}</div><div style="background-color: #dcb936; padding: 3px;">${city}</div></div>`)
        .openOn(map);
    }
  }
}
