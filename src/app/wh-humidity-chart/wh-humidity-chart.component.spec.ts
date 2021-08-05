import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhHumidityChartComponent } from './wh-humidity-chart.component';

describe('WhHumidityChartComponent', () => {
  let component: WhHumidityChartComponent;
  let fixture: ComponentFixture<WhHumidityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhHumidityChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhHumidityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
