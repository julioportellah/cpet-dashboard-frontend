import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPlotsComponent } from './description-plots.component';

describe('DescriptionPlotsComponent', () => {
  let component: DescriptionPlotsComponent;
  let fixture: ComponentFixture<DescriptionPlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionPlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
