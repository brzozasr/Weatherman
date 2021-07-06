import {Current} from "./current";
import {Minutely} from "./minutely";
import {Hourly} from "./hourly";
import {Daily} from "./daily";
import {Alerts} from "./alerts";

export interface WeatherForecast {
  lat?: number;
  Log?: number;
  timezone?: string;
  timezoneOffset?: number;
  current?: Current;
  minutely?: Minutely[];
  hourly?: Hourly[];
  daily?: Daily[];
  alerts?: Alerts[];
}
