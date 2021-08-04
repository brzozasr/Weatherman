import {Aggregation} from "./aggregation";

export interface AggHumidity extends Aggregation {
  humidityMin?: number;
  humidityMax?: number;
}
