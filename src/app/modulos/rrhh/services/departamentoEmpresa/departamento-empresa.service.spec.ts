import { TestBed } from '@angular/core/testing';

import { DepartamentoEmpresaService } from './departamento-empresa.service';

describe('DepartamentoEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartamentoEmpresaService = TestBed.get(DepartamentoEmpresaService);
    expect(service).toBeTruthy();
  });
});
