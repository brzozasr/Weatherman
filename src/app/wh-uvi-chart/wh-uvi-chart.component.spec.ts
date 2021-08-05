import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhUviChartComponent } from './wh-uvi-chart.component';

describe('WhUviChartComponent', () => {
  let component: WhUviChartComponent;
  let fixture: ComponentFixture<WhUviChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhUviChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhUviChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
