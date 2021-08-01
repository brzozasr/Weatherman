export class PrecipitationData {
  private dateTime: any;
  private rain: any;
  private snow: any;
  private pop: any;

  constructor(dataTime: any, rain: any, snow: any, pop: any) {
    this.dateTime = dataTime;
    this.rain = rain;
    this.snow = snow;
    this.pop = pop;
  }
}
