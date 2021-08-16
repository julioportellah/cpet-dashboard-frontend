import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTimelineComponent } from './score-timeline.component';

describe('ScoreTimelineComponent', () => {
  let component: ScoreTimelineComponent;
  let fixture: ComponentFixture<ScoreTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
