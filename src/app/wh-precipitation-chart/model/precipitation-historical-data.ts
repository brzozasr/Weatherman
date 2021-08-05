export class PrecipitationHistoricalData {
  private dateTime: any;
  private rain: any;
  private snow: any;

  constructor(dataTime: any, rain: any, snow: any) {
    this.dateTime = dataTime;
    this.rain = rain;
    this.snow = snow;
  }
}
