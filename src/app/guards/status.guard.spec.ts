import { TestBed } from '@angular/core/testing';

import { StatusGuard } from './status.guard';

describe('StatusGuard', () => {
  let guard: StatusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StatusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
