import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class OpenWeatherError {
  public openWeatherError(error: number): string {
    switch (error) {
      case 400: {
        return `${error} Bad Request`
      }
      case 401: {
        return `${error} Unauthorized: Did not specify your API key in API request or have free subscription and try to get access to our paid services`
      }
      case 403: {
        return `${error} Access Denied`;
      }
      case 404: {
        return `${error} Not Found: wrong API request or specify wrong city name, ZIP-code or city ID.`;
      }
      case 429: {
        return `${error} Too Many Requests: Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription http://openweathermap.org/price`;
      }
      case 500: {
        return `${error} Internal Server Error`;
      }
      default: {
        return `${error} Unknown Server Error`;
      }
    }
  }
}
