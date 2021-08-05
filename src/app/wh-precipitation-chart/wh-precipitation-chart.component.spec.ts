import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhPrecipitationChartComponent } from './wh-precipitation-chart.component';

describe('WhPrecipitationChartComponent', () => {
  let component: WhPrecipitationChartComponent;
  let fixture: ComponentFixture<WhPrecipitationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhPrecipitationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhPrecipitationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
