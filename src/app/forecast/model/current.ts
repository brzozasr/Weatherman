import {WindDir} from "./wind-dir";
import {Weather} from "./weather";
import {Rain} from "./rain";
import {Snow} from "./snow";

export interface Current {
  dtUtc?: any;
  dtLocal?: any;
  sunriseLocal?: any;
  sunsetLocal?: any;
  temp?: number;
  feelsLike?: number;
  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibilityKm?: number;
  windSpeed?: number;
  windSpeedKmPerH: number;
  windBeaufortScale?: string;
  windDir?: WindDir;
  windGust?: number;
  weathers?: Weather[];
  rain?: Rain;
  snow?: Snow;
}
