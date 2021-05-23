import { TestBed } from '@angular/core/testing';

import { AmandesService } from './amandes.service';

describe('AmandesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmandesService = TestBed.get(AmandesService);
    expect(service).toBeTruthy();
  });
});
