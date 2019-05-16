import { TestBed } from '@angular/core/testing';

import { SchedaService } from './scheda.service';

describe('SchedaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedaService = TestBed.get(SchedaService);
    expect(service).toBeTruthy();
  });
});
