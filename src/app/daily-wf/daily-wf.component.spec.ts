import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWfComponent } from './daily-wf.component';

describe('DailyWfComponent', () => {
  let component: DailyWfComponent;
  let fixture: ComponentFixture<DailyWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
