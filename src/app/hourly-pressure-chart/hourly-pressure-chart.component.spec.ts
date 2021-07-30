import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HourlyPressureChartComponent} from './hourly-pressure-chart.component';

describe('HourlyPressureChartComponent', () => {
  let component: HourlyPressureChartComponent;
  let fixture: ComponentFixture<HourlyPressureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyPressureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyPressureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
