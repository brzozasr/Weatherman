import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {SearchCity} from "../../map/models/search-city";
import {AppUrl} from "../../urls/app-url";
import {catchError, map} from "rxjs/operators";
import {CityNotFound} from "../../map/models/city-not-found";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCitiesService(partialCityName: string): Observable<SearchCity[] | CityNotFound> {
    return this.http.get<SearchCity[] | CityNotFound>(`${AppUrl.BASE_URL}Cities/Get/${partialCityName}`)
      .pipe(map(res => {
          if ('detail' in res) {
            return res;
          } else {
            return res;
          }
        },
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.handleError(error);
          }

          return throwError(errorMsg);
        })
      ));
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
