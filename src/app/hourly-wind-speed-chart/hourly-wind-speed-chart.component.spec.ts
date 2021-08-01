import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWindSpeedChartComponent } from './hourly-wind-speed-chart.component';

describe('HourlyWindSpeetChartComponent', () => {
  let component: HourlyWindSpeedChartComponent;
  let fixture: ComponentFixture<HourlyWindSpeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWindSpeedChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyWindSpeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
