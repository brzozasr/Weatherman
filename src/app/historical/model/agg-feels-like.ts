import {Aggregation} from "./aggregation";

export interface AggFeelsLike extends Aggregation {
  feelsLikeMin?: number;
  feelsLikeMax?: number;
}
