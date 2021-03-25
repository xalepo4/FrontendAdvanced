import { TestBed } from '@angular/core/testing';

import { TouristGuard } from './tourist.guard';

describe('TouristGuard', () => {
  let guard: TouristGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TouristGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
