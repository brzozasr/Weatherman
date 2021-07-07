import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class HandleError {
  public handleError(error: HttpErrorResponse): string {
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
