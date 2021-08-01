import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyPrecipitationChartComponent } from './hourly-precipitation-chart.component';

describe('HourlyPrecipitationChartComponent', () => {
  let component: HourlyPrecipitationChartComponent;
  let fixture: ComponentFixture<HourlyPrecipitationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyPrecipitationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyPrecipitationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
