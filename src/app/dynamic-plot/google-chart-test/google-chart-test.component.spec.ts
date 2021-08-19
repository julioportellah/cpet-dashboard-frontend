import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartTestComponent } from './google-chart-test.component';

describe('GoogleChartTestComponent', () => {
  let component: GoogleChartTestComponent;
  let fixture: ComponentFixture<GoogleChartTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleChartTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleChartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
