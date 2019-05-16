import { TestBed } from '@angular/core/testing';

import { EserciziService } from './esercizzi.service';

describe('EserciziService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EserciziService = TestBed.get(EserciziService);
    expect(service).toBeTruthy();
  });
});
