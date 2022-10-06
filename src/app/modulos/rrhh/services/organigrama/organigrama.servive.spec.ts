import { TestBed } from '@angular/core/testing';

import { OrganigramaService } from './organigrama.service';

describe('PuestoAreaEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganigramaService = TestBed.get(OrganigramaService);
    expect(service).toBeTruthy();
  });
});
