import { TestBed } from '@angular/core/testing';

import { UserStatusGuard } from './user-status.guard';

describe('UserStatusGuard', () => {
  let guard: UserStatusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserStatusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
