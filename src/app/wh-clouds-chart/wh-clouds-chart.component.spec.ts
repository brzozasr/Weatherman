import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhCloudsChartComponent } from './wh-clouds-chart.component';

describe('WhCloudsChartComponent', () => {
  let component: WhCloudsChartComponent;
  let fixture: ComponentFixture<WhCloudsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhCloudsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhCloudsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
