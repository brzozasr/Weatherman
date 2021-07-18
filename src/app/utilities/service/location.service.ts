import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ReverseGeocoding} from "./model/reverse-geocoding";
import {HandleError} from "../../error/handle-error";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient,
              private handle: HandleError) { }

  getReverseGeocoding(lat: number, lon: number): Observable<ReverseGeocoding> {
    return this.http.get<ReverseGeocoding>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pl`)
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
