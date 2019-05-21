import { TestBed } from '@angular/core/testing';

import { ProgrammaService } from './programma.service';

describe('ProgrammaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgrammaService = TestBed.get(ProgrammaService);
    expect(service).toBeTruthy();
  });
});
