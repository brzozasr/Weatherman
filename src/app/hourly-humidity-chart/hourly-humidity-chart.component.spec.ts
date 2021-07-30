import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyHumidityChartComponent } from './hourly-humidity-chart.component';

describe('HourlyHumidityChartComponent', () => {
  let component: HourlyHumidityChartComponent;
  let fixture: ComponentFixture<HourlyHumidityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyHumidityChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyHumidityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
