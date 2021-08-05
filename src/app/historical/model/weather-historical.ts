import {AggTemp} from "./agg-temp";
import {AggFeelsLike} from "./agg-feels-like";
import {AggPressure} from "./agg-pressure";
import {AggHumidity} from "./agg-humidity";
import {AggDewPoint} from "./agg-dew-point";
import {AggUvi} from "./agg-uvi";
import {AggVisibility} from "./agg-visibility";
import {AggWindSpeed} from "./agg-wind-speed";
import {AggRain} from "./agg-rain";
import {AggSnow} from "./agg-snow";
import {HourlyWh} from "./hourly-wh";

export interface WeatherHistorical {
  statusCode?: number;
  lat?: number;
  lon?: number;
  timezone?: string;
  timezoneOffset?: number;
  aggTemp?: AggTemp;
  aggFeelsLike?: AggFeelsLike;
  aggPressure?: AggPressure;
  aggHumidity?: AggHumidity;
  aggDewPoint?: AggDewPoint;
  aggUvi?: AggUvi;
  aggVisibility?: AggVisibility;
  aggWindSpeed?: AggWindSpeed;
  aggRain?: AggRain;
  aggSnow?: AggSnow;
  hourly?: HourlyWh[];
}
