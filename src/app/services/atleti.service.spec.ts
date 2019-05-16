import { TestBed } from '@angular/core/testing';

import { AtletiService } from './atleti.service';

describe('AtletiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtletiService = TestBed.get(AtletiService);
    expect(service).toBeTruthy();
  });
});
