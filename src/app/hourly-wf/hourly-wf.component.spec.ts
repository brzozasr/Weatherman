import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWfComponent } from './hourly-wf.component';

describe('HourlyWfComponent', () => {
  let component: HourlyWfComponent;
  let fixture: ComponentFixture<HourlyWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyWfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
