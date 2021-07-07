import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {PointsWeather} from "../models/points-weather";
import {AppUrl} from "../../urls/app-url";
import {catchError, map} from "rxjs/operators";
import {HandleError} from "../../error/handle-error";

@Injectable({
  providedIn: 'root'
})
export class PointsWeatherService {

  constructor(private http: HttpClient,
              private handle: HandleError) {
  }

  getWeatherBBox(lonLeft: number, latBottom: number, lonRight: number, latTop: number, zoom: number): Observable<PointsWeather[]> {
    return this.http.get<PointsWeather[]>(`${AppUrl.BASE_URL}Weather/Get/BBox/${lonLeft}/${latBottom}/${lonRight}/${latTop}/${zoom}`)
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
