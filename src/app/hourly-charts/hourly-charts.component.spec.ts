import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyChartsComponent } from './hourly-charts.component';

describe('HourlyChartsComponent', () => {
  let component: HourlyChartsComponent;
  let fixture: ComponentFixture<HourlyChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
