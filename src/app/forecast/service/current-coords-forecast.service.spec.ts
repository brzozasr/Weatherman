import { TestBed } from '@angular/core/testing';

import { CurrentCoordsForecastService } from './current-coords-forecast.service';

describe('CurrentCoordsForecastService', () => {
  let service: CurrentCoordsForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCoordsForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
