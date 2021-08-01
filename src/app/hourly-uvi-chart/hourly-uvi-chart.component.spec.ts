import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyUviChartComponent } from './hourly-uvi-chart.component';

describe('HourlyUviChartComponent', () => {
  let component: HourlyUviChartComponent;
  let fixture: ComponentFixture<HourlyUviChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyUviChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyUviChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
