import { TestBed } from '@angular/core/testing';

import { PuestoAreaEmpresaService } from './puesto-area-empresa.service';

describe('PuestoAreaEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuestoAreaEmpresaService = TestBed.get(PuestoAreaEmpresaService);
    expect(service).toBeTruthy();
  });
});
