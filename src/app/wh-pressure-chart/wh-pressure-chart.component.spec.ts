import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhPressureChartComponent } from './wh-pressure-chart.component';

describe('WhPressureChartComponent', () => {
  let component: WhPressureChartComponent;
  let fixture: ComponentFixture<WhPressureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhPressureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhPressureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
