import {Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {PointsWeatherService} from "./services/points-weather.service";
import {Observable} from "rxjs";
import {PointsWeather} from "./models/points-weather";
import {OpenWeatherError} from "../error/open-weather-error";
import {take} from "rxjs/operators";


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

  lonLeft?: number;
  latBottom?: number;
  lonRight?: number;
  latTop?: number;
  zoom?: number;

  weatherData$?: Observable<PointsWeather[]>;
  weatherData: PointsWeather[] = [];


  constructor(private service: PointsWeatherService) {
  }

  ngOnInit(): void {
    this.getBBox();
    this.getWeatherPoints();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.getBBox();
    this.getWeatherPoints();
    console.log(this.weatherData.length);
    this.setPointsOnMap();
  }

  onMapMoveEnd(): void {
    this.getBBox();
    this.getWeatherPoints();
    console.log(this.weatherData.length);
    this.setPointsOnMap();
  }

  setLabel(map: L.Map | undefined, lat: number, lng: number, temperature: number, city: string, icon: string): void {
    if (map !== undefined) {
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

  getWeatherPoints(): void {
    //let x = this.getBBox();
    if (this.lonLeft && this.latBottom && this.lonRight && this.latTop && this.zoom) {
      console.log("INSIDE WWW")
      this.weatherData$ = this.service.getWeatherBBox(
        this.lonLeft, this.latBottom, this.lonRight, this.latTop, this.zoom);

      this.subscribePointsOnce();
    }
  }

  subscribePointsOnce(): void {
    this.weatherData$?.pipe(take(1)).subscribe((data) => {
        this.weatherData = data;
      },
      error => console.error('HTTP Error', error),
      () => console.log('HTTP request completed.'));
  }

  setPointsOnMap(): void {
    if (this.weatherData.length > 0) {
      for (const p of this.weatherData) {
        if (p.lat && p.lon && p.temp && p.cityName && p.icon && p.code === 200) {
          this.setLabel(this.map, p.lat, p.lon, p.temp, p.cityName, p.icon);
        } else {
          if (p.code !== undefined) {
            let err = new OpenWeatherError();
            console.error(err.openWeatherError(p.code));
          }
        }
      }
    }
  }

  /*setPointsOnMap(): void {
    this.weatherData$?.pipe(take(1)).subscribe((data) => {
        this.weatherData = data;
      },
      error => console.error('HTTP Error', error),
      () => console.log('HTTP request completed.'));

    if (this.weatherData.length > 0) {
      for (const p of this.weatherData) {
        if (p.lat && p.lon && p.temp && p.cityName && p.icon && p.code === 200) {
          this.setLabel(this.map, p.lat, p.lon, p.temp, p.cityName, p.icon);
        }
      }
    }
  }*/

  /*setPointsOnMap(): void {
    //this.getWeatherPoints();
    this.weatherData$?.pipe(take(1)).subscribe((data) => {
        data.forEach((p, index) => {
          if (p.lat && p.lon && p.temp && p.cityName && p.icon && p.code === 200) {
            this.setLabel(this.map, p.lat, p.lon, p.temp, p.cityName, p.icon);
            console.log(index);
          } else {
            if (p.code !== undefined) {
              let err = new OpenWeatherError();
              console.error(err.openWeatherError(p.code));
            }
          }
        })
      },
      error => console.error('HTTP Error', error),
      () => console.log('HTTP request completed.'));
  }*/

  getBBox(): void {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    this.lonLeft = bounds?.getWest();
    this.latBottom = bounds?.getSouth();
    this.lonRight = bounds?.getEast();
    this.latTop = bounds?.getNorth();
    this.zoom = zoomMap;
  }

  /*getBBox(): any {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    return{
      lonLeft: bounds?.getWest(),
      latBottom: bounds?.getSouth(),
      lonRight: bounds?.getEast(),
      latTop: bounds?.getNorth(),
      zoom: zoomMap,
    }
  }*/
}
