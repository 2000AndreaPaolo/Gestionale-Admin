import { TestBed } from '@angular/core/testing';

import { ProgressioneService } from './progressione.service';

describe('ProgressioneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressioneService = TestBed.get(ProgressioneService);
    expect(service).toBeTruthy();
  });
});
