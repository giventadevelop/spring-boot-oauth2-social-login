import { TestBed } from '@angular/core/testing';

import { UserIdleSessionTimeoutService } from './user-idle-session-timeout.service';

describe('UserIdleSessionTimeoutService', () => {
  let service: UserIdleSessionTimeoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdleSessionTimeoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
