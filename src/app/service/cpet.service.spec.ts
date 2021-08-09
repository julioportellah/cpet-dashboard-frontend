import { TestBed } from '@angular/core/testing';

import { CpetService } from './cpet.service';

describe('CpetService', () => {
  let service: CpetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
