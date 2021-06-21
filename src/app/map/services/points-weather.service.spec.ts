import { TestBed } from '@angular/core/testing';

import { PointsWeatherService } from './points-weather.service';

describe('PointsWeatherService', () => {
  let service: PointsWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
