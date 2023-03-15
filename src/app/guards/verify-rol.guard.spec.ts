import { TestBed } from '@angular/core/testing';

import { VerifyRolGuard } from './verify-rol.guard';

describe('VerifyRolGuard', () => {
  let guard: VerifyRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
