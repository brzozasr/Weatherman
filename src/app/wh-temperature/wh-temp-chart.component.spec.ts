import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhTempChartComponent } from './wh-temp-chart.component';

describe('WhTemperatureComponent', () => {
  let component: WhTempChartComponent;
  let fixture: ComponentFixture<WhTempChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhTempChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhTempChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
