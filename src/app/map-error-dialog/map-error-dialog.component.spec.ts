import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapErrorDialogComponent } from './map-error-dialog.component';

describe('MapErrorDialogComponent', () => {
  let component: MapErrorDialogComponent;
  let fixture: ComponentFixture<MapErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
