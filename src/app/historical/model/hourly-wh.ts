import {WeatherWh} from "./weather-wh";
import {RainWh} from "./rain-wh";
import {SnowWh} from "./snow-wh";
import {WindDirWh} from "./wind-dir-wh";

export interface HourlyWh {
  dt?: any;
  dtLocal?: any;
  temp?: number;
  feelsLike?: number;
  pressure?: number;
  humidity?: number;
  dewPoint?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  visibilityKm?: number;
  windSpeed?: number;
  windSpeedKmPerH?: number;
  windGust?: number;
  windDeg?: number;
  windDir?: WindDirWh;
  weathers?: WeatherWh[];
  rain?: RainWh;
  snow?: SnowWh;
}
