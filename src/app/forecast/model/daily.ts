import {Rain} from "./rain";
import {Snow} from "./snow";
import {WindDir} from "./wind-dir";
import {Weather} from "./weather";
import {Temp} from "./temp";
import {FeelsLike} from "./feels-like";

export interface Daily {
  dtLocal?: any;
  sunriseLocal?: any;
  sunsetLocal?: any;
  moonriseLocal?: any;
  moonsetLocal?: any;
  moonPhase?: any;
  temp?: Temp;
  feelsLike?: FeelsLike;
  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  windSpeed?: number;
  windSpeedKmPerH?: number;
  windBeaufortScale?: string;
  windDir?: WindDir;
  windGust?: number;
  weathers?: Weather[];
  clouds?: number;
  pop?: number;
  uvi?: number;
  rain?: number;
  snow?: number;
}
