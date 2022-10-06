import { TestBed } from '@angular/core/testing';

import { ReclutamientoService } from './reclutamiento.service';

describe('ReclutamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReclutamientoService = TestBed.get(ReclutamientoService);
    expect(service).toBeTruthy();
  });
});
