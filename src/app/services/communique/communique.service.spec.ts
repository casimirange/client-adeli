import { TestBed } from '@angular/core/testing';

import { CommuniqueService } from './communique.service';

describe('CommuniqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommuniqueService = TestBed.get(CommuniqueService);
    expect(service).toBeTruthy();
  });
});
