import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhWindSpeedChartComponent } from './wh-wind-speed-chart.component';

describe('WhWindSpeedChartComponent', () => {
  let component: WhWindSpeedChartComponent;
  let fixture: ComponentFixture<WhWindSpeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhWindSpeedChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhWindSpeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
