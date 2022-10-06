import { TestBed } from '@angular/core/testing';

import { BuzonSugerenciaService } from './buzon-sugerencia.service';

describe('BuzonSugerenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuzonSugerenciaService = TestBed.get(BuzonSugerenciaService);
    expect(service).toBeTruthy();
  });
});
