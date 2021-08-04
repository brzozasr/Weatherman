import {Aggregation} from "./aggregation";

export interface AggRain extends Aggregation {
  rainMin?: number;
  rainMax?: number;
}
