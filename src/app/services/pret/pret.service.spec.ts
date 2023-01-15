import { TestBed } from '@angular/core/testing';

import { PretService } from './pret.service';

describe('PretService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PretService = TestBed.get(PretService);
    expect(service).toBeTruthy();
  });
});
