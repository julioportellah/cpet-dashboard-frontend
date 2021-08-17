import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancePlotComponent } from './performance-plot.component';

describe('PerformancePlotComponent', () => {
  let component: PerformancePlotComponent;
  let fixture: ComponentFixture<PerformancePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformancePlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
