import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRadarPlotComponent } from './dynamic-radar-plot.component';

describe('DynamicRadarPlotComponent', () => {
  let component: DynamicRadarPlotComponent;
  let fixture: ComponentFixture<DynamicRadarPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicRadarPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRadarPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
