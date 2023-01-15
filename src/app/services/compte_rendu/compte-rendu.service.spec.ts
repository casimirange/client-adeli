import { TestBed } from '@angular/core/testing';

import { CompteRenduService } from './compte-rendu.service';

describe('CompteRenduService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompteRenduService = TestBed.get(CompteRenduService);
    expect(service).toBeTruthy();
  });
});
