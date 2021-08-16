import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPlotComponent } from './dynamic-plot.component';

describe('DynamicPlotComponent', () => {
  let component: DynamicPlotComponent;
  let fixture: ComponentFixture<DynamicPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
