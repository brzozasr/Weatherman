export class DailyTemp {

  id?: number;
  day?: number;
  night?: number;
  eve?: number;
  morn?: number;

  constructor(id?: number, day?: number, night?: number, eve?: number, morn?: number) {
    this.id = id;
    this.day = day;
    this.night = night;
    this.eve = eve;
    this.morn = morn;
  }
}
