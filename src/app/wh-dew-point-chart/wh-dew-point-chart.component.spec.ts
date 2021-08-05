import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhDewPointChartComponent } from './wh-dew-point-chart.component';

describe('WhDewPointChartComponent', () => {
  let component: WhDewPointChartComponent;
  let fixture: ComponentFixture<WhDewPointChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhDewPointChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhDewPointChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
