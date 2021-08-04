import {Aggregation} from "./aggregation";

export interface AggWindSpeed extends Aggregation {
  windSpeedMin?: number;
  windSpeedMax?: number;
}
