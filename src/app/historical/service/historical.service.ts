import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HandleError} from "../../error/handle-error";
import {Observable, throwError} from "rxjs";
import {AppUrl} from "../../urls/app-url";
import {catchError} from "rxjs/operators";
import {WeatherHistorical} from "../model/weather-historical";

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  constructor(private http: HttpClient,
              private handle: HandleError) { }

  getWeatherHistoricalService(lat: number, lon: number): Observable<WeatherHistorical> {
    return this.http.get<WeatherHistorical>(`${AppUrl.BASE_URL}Weather/Historical/Get/Point/${lat}/${lon}`)
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.handle.handleError(error);
          }

          return throwError(errorMsg);
        })
      );
  }

}
