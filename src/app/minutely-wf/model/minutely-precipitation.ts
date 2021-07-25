export class MinutelyPrecipitation {
  time?: string;
  precipitation?: number;

  constructor(time?: string, precipitation?: number) {
    this.time = time?.slice(11, 16);
    this.precipitation = precipitation;
  }
}
