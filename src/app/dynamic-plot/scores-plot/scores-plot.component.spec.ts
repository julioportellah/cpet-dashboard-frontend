import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresPlotComponent } from './scores-plot.component';

describe('ScoresPlotComponent', () => {
  let component: ScoresPlotComponent;
  let fixture: ComponentFixture<ScoresPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
