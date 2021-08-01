import {WindDir} from "./wind-dir";
import {Weather} from "./weather";
import {Rain} from "./rain";
import {Snow} from "./snow";

export interface Hourly {
  dtLocal?: any;
  temp?: number;
  feelsLike?: number;
  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibilityKm?: number;
  windSpeed?: number;
  windSpeedKm?: number;
  windDir?: WindDir;
  windGust?: number;
  weathers?: Weather[];
  pop?: number;
  rain?: Rain;
  snow?: Snow;
}
