import {Aggregation} from "./aggregation";

export interface AggTemp extends Aggregation {
  tempMin?: number;
  tempMax: number;
}
