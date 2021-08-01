export class PrecipitationData {
  private DateTime: any;
  private Rain: any;
  private Snow: any;
  private Pop: any;

  constructor(dataTime: any, rain: any, snow: any, pop: any) {
    this.DateTime = dataTime;
    this.Rain = rain;
    this.Snow = snow;
    this.Pop = pop;
  }
}
