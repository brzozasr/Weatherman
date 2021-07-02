import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {PointsWeatherService} from "./services/points-weather.service";
import {Observable} from "rxjs";
import {PointsWeather} from "./models/points-weather";
import {OpenWeatherError} from "../error/open-weather-error";
import {ColorPicker} from "../utilities/color-picker";
import {MatDialog} from "@angular/material/dialog";
import {MapErrorDialogComponent} from "../map-error-dialog/map-error-dialog.component";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public map: L.Map | undefined;
  private centroid: L.LatLngExpression = [52.231821, 21.020862]; // Warsaw

  options = {
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1.0,
      minZoom: 3,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://openweathermap.org">OpenWeather</a>'
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
  arrayOfLabels: L.Popup[] = [];

  warning: string = '';
  showWarning: boolean = true;

  constructor(private service: PointsWeatherService,
              private openWeatherError: OpenWeatherError,
              private colorPicker: ColorPicker,
              public errorDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBBox();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    L.control.scale().addTo(map);
    this.addPointsToMap();
  }

  onMapChangePan(): void {
    this.addPointsToMap();
  }

  setLabel(map: L.Map | undefined, lat: number, lng: number, temperature: number, city: string, icon: string): L.Popup | undefined {
    if (map !== undefined) {
      let temp = Math.round(temperature);
      let color = this.colorPicker.setColor(temp);

      return L.popup({
        offset: L.point(45, 35),
        closeButton: false,
        autoClose: false,
        className: 'custom-popup'
      }).setLatLng([lat, lng])
        .setContent(`<div style="display: flex; flex-flow: row nowrap;"><div style="padding: 0; background-color: #b3b3b3; border-radius: 4px 0 0 4px;"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" style="height: 20px;"></div><div style="background-color: #233766; padding: 3px;">${temp}</div><div style="background-color: ${color}; padding: 3px; border-radius: 0 4px 4px 0; white-space: nowrap;">${city}</div></div>`)
        .openOn(map);
    }
    return undefined;
  }

  getWeatherPoints(): void {
    if (this.lonLeft && this.latBottom && this.lonRight && this.latTop && this.zoom) {
      this.weatherData$ = this.service.getWeatherBBox(
        this.lonLeft, this.latBottom, this.lonRight, this.latTop, this.zoom);
    }
  }

  setPointsOnMap(): void {
    this.removePopups();
    this.weatherData$?.pipe(take(1)).subscribe((data) => {
        if (data) {
          data.forEach((p, index) => {
            if (p.lat && p.lon && p.temp && p.cityName && p.icon && p.code === 200) {
              let popup = this.setLabel(this.map, p.lat, p.lon, p.temp, p.cityName, p.icon);
              this.warning = '';
              if (popup) {
                this.arrayOfLabels.push(popup);
              }
              if (!this.showWarning) {
                this.showWarning = true;
              }
            } else {
              if (p.code !== undefined) {
                console.error(this.warning = this.openWeatherError.catchWeatherError(p.code));
              }
              if (this.showWarning) {
                this.showWarning = false;
                this.openErrorDialog();
              }
            }

          });
        }
      },
      error => console.error('HTTP Error', error),
      () => console.log('HTTP request completed.'));
  }

  addPointsToMap(): void {
    this.getBBox();
    setTimeout(() => {
      this.getWeatherPoints();
      this.setPointsOnMap();
    }, 450);
  }

  getBBox(): void {
    let bounds = this.map?.getBounds();
    let zoomMap = this.map?.getZoom();

    this.lonLeft = bounds?.getWest();
    this.latBottom = bounds?.getSouth();
    this.lonRight = bounds?.getEast();
    this.latTop = bounds?.getNorth();
    this.zoom = zoomMap;
  }

  removePopups(): void {
    if (this.arrayOfLabels.length > 0) {
      for (const popup of this.arrayOfLabels) {
        popup.remove();
      }
      this.arrayOfLabels = [];
    }
  }

  openErrorDialog(): void {
    const dialogRef = this.errorDialog.open(MapErrorDialogComponent, {
      data: {
        warning: this.warning
      }
    });
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
