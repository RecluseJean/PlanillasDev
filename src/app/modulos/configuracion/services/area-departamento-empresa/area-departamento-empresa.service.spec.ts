import { TestBed } from '@angular/core/testing';

import { AreaDepartamentoEmpresaService } from './area-departamento-empresa.service';

describe('AreaDepartamentoEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaDepartamentoEmpresaService = TestBed.get(AreaDepartamentoEmpresaService);
    expect(service).toBeTruthy();
  });
});
