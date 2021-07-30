import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyDewPointChartComponent } from './hourly-dew-point-chart.component';

describe('HourlyDewPointChartComponent', () => {
  let component: HourlyDewPointChartComponent;
  let fixture: ComponentFixture<HourlyDewPointChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyDewPointChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyDewPointChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
