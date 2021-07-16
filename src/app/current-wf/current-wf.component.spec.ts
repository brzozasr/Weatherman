import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWfComponent } from './current-wf.component';

describe('CurrentWfComponent', () => {
  let component: CurrentWfComponent;
  let fixture: ComponentFixture<CurrentWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
