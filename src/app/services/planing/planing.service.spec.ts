import { TestBed } from '@angular/core/testing';

import { PlaningService } from './planing.service';

describe('PlaningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaningService = TestBed.get(PlaningService);
    expect(service).toBeTruthy();
  });
});
