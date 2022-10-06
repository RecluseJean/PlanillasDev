import { TestBed, inject } from '@angular/core/testing';

import { RemuneracionesService } from './remuneraciones.service';

describe('RemuneracionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemuneracionesService]
    });
  });

  it('should be created', inject([RemuneracionesService], (service: RemuneracionesService) => {
    expect(service).toBeTruthy();
  }));
});
