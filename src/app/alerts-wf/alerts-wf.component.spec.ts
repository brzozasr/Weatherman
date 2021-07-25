import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsWfComponent } from './alerts-wf.component';

describe('AlertsWfComponent', () => {
  let component: AlertsWfComponent;
  let fixture: ComponentFixture<AlertsWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsWfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
