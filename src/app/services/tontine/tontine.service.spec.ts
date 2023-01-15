import { TestBed } from '@angular/core/testing';

import { TontineService } from './tontine.service';

describe('TontineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TontineService = TestBed.get(TontineService);
    expect(service).toBeTruthy();
  });
});
