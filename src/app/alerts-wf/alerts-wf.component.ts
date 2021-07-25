import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";

@Component({
  selector: 'app-alerts-wf',
  templateUrl: './alerts-wf.component.html',
  styleUrls: ['./alerts-wf.component.css']
})
export class AlertsWfComponent implements OnInit {
  panelOpenState: boolean = false;

  @Input() weatherPoint?: WeatherForecast;
  colors: string[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.colors = this.getColor();
    }, 500);
  }

  getColor(): string[] {
    let colorsArray: string[] = [];
    if (this.weatherPoint?.alerts && this.weatherPoint.alerts.length > 0) {
      this.weatherPoint.alerts.forEach((data) => {
        let txt = data.event;
        let color = txt?.split(" ");
        if (color && color.length > 0) {
          switch (color[0].toLowerCase()) {
            case "red":
              colorsArray.push("panel-red");
              break;
            case "orange":
              colorsArray.push("panel-orange");
              break;
            case "yellow":
              colorsArray.push("panel-yellow");
              break;
            default:
              colorsArray.push("panel-warning");
          }
        } else {
          colorsArray.push("panel-warning");
        }
      });
    }
    return colorsArray;
  }

}
