import { TestBed } from '@angular/core/testing';

import { PesoService } from './peso.service';

describe('PesoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesoService = TestBed.get(PesoService);
    expect(service).toBeTruthy();
  });
});
