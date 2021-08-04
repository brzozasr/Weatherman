import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxWhComponent } from './min-max-wh.component';

describe('MinMaxWhComponent', () => {
  let component: MinMaxWhComponent;
  let fixture: ComponentFixture<MinMaxWhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinMaxWhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxWhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
