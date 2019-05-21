import { TestBed } from '@angular/core/testing';

import { ProgrammazioneService } from './programmazione.service';

describe('ProgrammazioneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgrammazioneService = TestBed.get(ProgrammazioneService);
    expect(service).toBeTruthy();
  });
});
