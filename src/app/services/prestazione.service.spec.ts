import { TestBed } from '@angular/core/testing';

import { PrestazioneService } from './prestazione.service';

describe('PrestazioneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestazioneService = TestBed.get(PrestazioneService);
    expect(service).toBeTruthy();
  });
});
