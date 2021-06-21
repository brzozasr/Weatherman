import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {PointsWeatherService} from "./services/points-weather.service";
import {Observable} from "rxjs";
import {PointsWeather} from "./models/points-weather";
import {OpenWeatherError} from "../error/open-weather-error";


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
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://openweathermap.org">OpenWeather</a>'
    })],
    zoom: 8,
    center: this.centroid
  };

  $weatherData: Observable<PointsWeather[]>;

  constructor(private service: PointsWeatherService) {
    this.$weatherData = this.getWeatherPoints();
  }

  ngOnInit(): void {
  }

  onMapReady(map: L.Map) {
    this.map = map;

    let x = this.getBBox();

    this.$weatherData = this.service.getWeatherPoints(x.lonLeft, x.latBottom, x.lonRight, x.latTop, x.zoom);
    this.setPointsOnMap();
    //this.setLabel(map, 52.2298, 21.0118, 31.5, 'Warszawa', '01n');
    //this.setLabel(map, 53.2398, 21.0318, 31.5, 'Warszawa1', '01d');
    //this.setLabel(map, 54.2498, 21.0118, 31.5, 'Warszawa2', '01n');
    //this.setLabel(map, 55.2598, 21.0118, 31.5, 'Warszawa3', '01n');
  }

  onMapMoveEnd(): void {
    //this.setPointsOnMap();
    //this.setLabel(this.map, 52.2298, 21.0118, 31.5, 'Warszawa', '01n');
  }

  setLabel(map: L.Map | undefined, lat: number, lng: number, temperature: number, city: string, icon: string): void {
    if (map !== undefined) {
      //map.closePopup();

      let temp = Math.round(temperature);

      L.popup({
        offset: L.point(45, 35),
        closeButton: false,
        autoClose: false,
        className: 'custom-popup'
      })
        .setLatLng([lat, lng])
        .setContent(`<div style="display: flex; flex-flow: row nowrap;"><div style="padding: 0; background-color: #b3b3b3; border-radius: 4px 0 0 4px;"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" style="height: 20px;"></div><div style="background-color: #233766; padding: 3px;">${temp}</div><div style="background-color: #dcb936; padding: 3px; border-radius: 0 4px 4px 0; white-space: nowrap;">${city}</div></div>`)
        .openOn(map);
    }
  }

  getWeatherPoints(): Observable<PointsWeather[]> {
    let x = this.getBBox();
    return this.service.getWeatherPoints(
      x.lonLeft, x.latBottom, x.lonRight, x.latTop, x.zoom);
  }

  setPointsOnMap(): void {
    this.$weatherData.subscribe((data) => {
        data.forEach((p) => {
          if (p.lat && p.lon && p.temp && p.cityName && p.icon && p.code === 200) {
            this.setLabel(this.map, p.lat, p.lon, p.temp, p.cityName, p.icon)
          } else {
            if (p.code !== undefined) {
              let err = new OpenWeatherError();
              console.error(err.openWeatherError(p.code));
            }
          }
        })
      },
      error => console.log('HTTP Error', error),
      () => console.log('HTTP request completed.'));
  }

  getBBox(): any {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    return{
      lonLeft: bounds?.getWest(),
      latBottom: bounds?.getSouth(),
      lonRight: bounds?.getEast(),
      latTop: bounds?.getNorth(),
      zoom: zoomMap,
    }
  }
}
