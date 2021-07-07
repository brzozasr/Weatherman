import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AppUrl} from "../../urls/app-url";
import {WeatherForecast} from "../model/weather-forecast";
import {catchError} from "rxjs/operators";
import {HandleError} from "../../error/handle-error";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient,
              private handle: HandleError) { }

  getWeatherForecastService(lat: number, lon: number): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`${AppUrl.BASE_URL}Weather/Forecast/Get/Point/${lat}/${lon}`)
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
