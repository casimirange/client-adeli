import { TestBed } from '@angular/core/testing';

import { RetenueService } from './retenue.service';

describe('RetenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetenueService = TestBed.get(RetenueService);
    expect(service).toBeTruthy();
  });
});
