import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlottingComponent } from './map-plotting.component';

describe('MapPlottingComponent', () => {
  let component: MapPlottingComponent;
  let fixture: ComponentFixture<MapPlottingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPlottingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPlottingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
