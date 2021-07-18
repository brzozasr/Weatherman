import { TestBed } from '@angular/core/testing';

import { CurrentCoordsHistoricalService } from './current-coords-historical.service';

describe('CurrentCoordsHistoricalService', () => {
  let service: CurrentCoordsHistoricalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCoordsHistoricalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
