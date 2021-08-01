import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyCloudsChartComponent } from './hourly-clouds-chart.component';

describe('HourlyCloudsChartComponent', () => {
  let component: HourlyCloudsChartComponent;
  let fixture: ComponentFixture<HourlyCloudsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyCloudsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyCloudsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
