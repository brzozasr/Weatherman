import {Aggregation} from "./aggregation";

export interface AggUvi extends Aggregation {
  uviMin?: number;
  uviMax?: number;
}
