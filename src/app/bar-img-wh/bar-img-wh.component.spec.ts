import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarImgWhComponent } from './bar-img-wh.component';

describe('BarImgWhComponent', () => {
  let component: BarImgWhComponent;
  let fixture: ComponentFixture<BarImgWhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarImgWhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarImgWhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
