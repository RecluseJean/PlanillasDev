import { TestBed, inject } from '@angular/core/testing';
import { VacacionesService } from './vacaciones.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';

describe('VacacionesService', () => {

  const mockResponse = ConstantesDatosPrueba.ResponseWrapperVacaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [VacacionesService],
    });
  });

  it('should be created', inject([VacacionesService], (service: VacacionesService) => {
    expect(service).toBeTruthy();
  }));

  describe("Prueba metodo ListarPorTrabajador", () => {
    it("Deberia retornar un valor en especifico con la ruta correcta", inject(
      [HttpTestingController, VacacionesService],
      (httpMock: HttpTestingController, vacacionService: VacacionesService) => {
        const url = 'http://localhost:2000/api/vacaciones/listarPorTrabajador';
        vacacionService.listarPorTrabajador({})
          .subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
          });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse)
      }
    ));
  });

  describe("Prueba metodo CalcularFechFin", () => {
    it("Deberia retornar un valor en especifico con la ruta correcta", inject(
      [HttpTestingController, VacacionesService],
      (httpMock: HttpTestingController, vacacionService: VacacionesService) => {
        const url = 'http://localhost:2000/api/vacaciones/calcFin';
        vacacionService.calcularFechFin({})
          .subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
          });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse)
      }
    ));
  });

  describe("Prueba metodo registrarVacaTomada", () => {
    it("Deberia retornar un valor en especifico con la ruta correcta", inject(
      [HttpTestingController, VacacionesService],
      (httpMock: HttpTestingController, vacacionService: VacacionesService) => {
        const url = 'http://localhost:2000/api/vacaciones/registrarVT';
        vacacionService.registrarVacaTomada({})
          .subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
          });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse)
      }
    ));
  });

  describe("Prueba metodo registrarVacaVendida", () => {
    it("Deberia retornar un valor en especifico con la ruta correcta", inject(
      [HttpTestingController, VacacionesService],
      (httpMock: HttpTestingController, vacacionService: VacacionesService) => {
        const url = 'http://localhost:2000/api/vacaciones/registrarVV';
        vacacionService.registrarVacaVendida({})
          .subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
          });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse)
      }
    ));
  });

  describe("Prueba metodo  registrarVacaAdelantada", () => {
    it("Deberia retornar un valor en especifico con la ruta correcta", inject(
      [HttpTestingController, VacacionesService],
      (httpMock: HttpTestingController, vacacionService: VacacionesService) => {
        const url = 'http://localhost:2000/api/vacaciones/registrarVA/1';
        vacacionService.registrarVacaAdelantada({}, 1)
          .subscribe((resp: any) => {
            expect(resp).toEqual(mockResponse);
          });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse)
      }
    ));
  });
});
