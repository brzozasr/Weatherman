import {Aggregation} from "./aggregation";

export interface AggVisibility extends Aggregation {
  visibilityKmMin?: number;
  visibilityKmMax?: number;
}
