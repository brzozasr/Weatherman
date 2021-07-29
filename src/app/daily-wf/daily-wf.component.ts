import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../forecast/model/weather-forecast";
import {Subject} from "rxjs";
import {DailyTemp} from "../daily-temp-chart/models/daily-temp";
import {DailyFeelsLike} from "../daily-temp-chart/models/daily-feels-like";

@Component({
  selector: 'app-daily-wf',
  templateUrl: './daily-wf.component.html',
  styleUrls: ['./daily-wf.component.css']
})
export class DailyWfComponent implements OnInit {

  @Input() weatherPoint?: WeatherForecast;
  temps?: [DailyTemp[], DailyFeelsLike[]];

  private resetData: Subject<[DailyTemp, DailyFeelsLike]> = new Subject<[DailyTemp, DailyFeelsLike]>();
  resetData$ = this.resetData.asObservable();

  constructor() { }

  ngOnInit(): void {
  }


  onOpenPanel($event: any, panelNo: number) {
    let tempList: DailyTemp[] = [];
    let feelsLikeList: DailyFeelsLike[] = [];

    this.weatherPoint?.daily?.forEach((x, i) => {
      let tempObj = new DailyTemp(
        i,
        x.temp?.day,
        x.temp?.night,
        x.temp?.eve,
        x.temp?.morn
      )
      tempList.push(tempObj);
    });

    this.weatherPoint?.daily?.forEach((x, i) => {
      let feelsLikeObj = new DailyFeelsLike(
        i,
        x.feelsLike?.day,
        x.feelsLike?.night,
        x.feelsLike?.eve,
        x.feelsLike?.morn
      )
      feelsLikeList.push(feelsLikeObj);
    });

    this.temps = [tempList, feelsLikeList];

    if ($event === true) {
      console.log(`${panelNo} => ${$event}`);

      //this.resetData.next([tempList[panelNo], feelsLikeList[panelNo]]);
    }

  }
}
