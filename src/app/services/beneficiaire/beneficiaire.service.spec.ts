import { TestBed } from '@angular/core/testing';

import { BeneficiaireService } from './beneficiaire.service';

describe('BeneficiaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiaireService = TestBed.get(BeneficiaireService);
    expect(service).toBeTruthy();
  });
});
