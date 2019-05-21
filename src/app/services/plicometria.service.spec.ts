import { TestBed } from '@angular/core/testing';

import { PlicometriaService } from './plicometria.service';

describe('PlicometriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlicometriaService = TestBed.get(PlicometriaService);
    expect(service).toBeTruthy();
  });
});
