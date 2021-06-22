import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {PointsWeather} from "../models/points-weather";
import {AppUrl} from "../../urls/app-url";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PointsWeatherService {

  constructor(private http: HttpClient) {
  }

  getWeatherBBox(lonLeft: number, latBottom: number, lonRight: number, latTop: number, zoom: number): Observable<PointsWeather[]> {
    return this.http.get<PointsWeather[]>(`${AppUrl.BASE_URL}Weather/Get/BBox/${lonLeft}/${latBottom}/${lonRight}/${latTop}/${zoom}`)
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.handleError(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  handleError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: {
        return `Bad Request: ${error.message}`
      }
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 429: {
        return `Too Many Requests: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
