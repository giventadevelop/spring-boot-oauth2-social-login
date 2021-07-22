import { TestBed } from '@angular/core/testing';

import { SessionTimeoutEventEmitterService } from './session-timeout-event-emitter.service';

describe('SessionTimeoutEventEmitterService', () => {
  let service: SessionTimeoutEventEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTimeoutEventEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
