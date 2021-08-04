import {Aggregation} from "./aggregation";

export interface AggDewPoint extends Aggregation {
  dewPointMin?: number;
  dewPointMax?: number;
}
