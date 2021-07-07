import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {SearchCity} from "../../map/models/search-city";
import {AppUrl} from "../../urls/app-url";
import {catchError, map} from "rxjs/operators";
import {CityNotFound} from "../../map/models/city-not-found";
import {HandleError} from "../../error/handle-error";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient,
              private handle: HandleError) {
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
            errorMsg = this.handle.handleError(error);
          }

          return throwError(errorMsg);
        })
      ));
  }
}
