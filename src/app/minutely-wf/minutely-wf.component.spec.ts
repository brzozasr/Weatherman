import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutelyWfComponent } from './minutely-wf.component';

describe('MinutelyWfComponent', () => {
  let component: MinutelyWfComponent;
  let fixture: ComponentFixture<MinutelyWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutelyWfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutelyWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
