import { TestBed } from '@angular/core/testing';

import { CestinoService } from './cestino.service';

describe('CestinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CestinoService = TestBed.get(CestinoService);
    expect(service).toBeTruthy();
  });
});
