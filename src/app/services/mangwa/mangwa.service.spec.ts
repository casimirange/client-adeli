import { TestBed } from '@angular/core/testing';

import { MangwaService } from './mangwa.service';

describe('MangwaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MangwaService = TestBed.get(MangwaService);
    expect(service).toBeTruthy();
  });
});
