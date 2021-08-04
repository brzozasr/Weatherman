import {Aggregation} from "./aggregation";

export interface AggPressure extends Aggregation {
  pressureMin?: number;
  pressureMax?: number;
}
