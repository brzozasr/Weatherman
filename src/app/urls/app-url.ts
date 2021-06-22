import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppUrl {

  public static readonly DOMAIN = 'https://localhost:5001/';

  public static readonly BASE_URL = 'https://localhost:5001/api/';

  public static readonly ROUTE = {
    // Example below with passing args to path
    // getUrl: (userId: string, param: string) => `/user/${userId}/${param}`


  };

}
