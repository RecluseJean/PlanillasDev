import { TestBed, inject } from '@angular/core/testing';
import { TipoPlanillaService } from './tipo-planilla.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { TipoPlanilla } from '../../../../models/Tipo-Planilla';

describe('TipoPlanillaService', () => {

  var empresa = ConstantesDatosPrueba.empresa1;
  var mockTipoPlanilla = ConstantesDatosPrueba.CRUDTipoPlanilla;
  var tipoPlanilla = new TipoPlanilla();
  tipoPlanilla.idTipoPlanilla = 1;
  var mockTipoPlanillaDTO = {
    "tipoPlanilla": tipoPlanilla,
    "lsPerfiles": []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoPlanillaService]
    });
  });

  it('should be created', inject([TipoPlanillaService], (service: TipoPlanillaService) => {
    expect(service).toBeTruthy();
  }));

  it("Listar TipoPlanilla Por empresa", inject(
    [HttpTestingController, TipoPlanillaService],
    (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
      const url = 'http://localhost:2000/api/tipoPlanilla/listarPorEmpresa';

      tipoPlanillaService.listar(empresa).subscribe(resp => {
        expect(resp).toEqual(mockTipoPlanilla);
      })
      const req = httpMock.expectOne(url)
      expect(req.request.method).toBe('POST')
      req.flush(mockTipoPlanilla)

    }
  ));

  it("Registrar TipoPlanilla", inject([HttpTestingController, TipoPlanillaService],
    (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
      const url = 'http://localhost:2000/api/tipoPlanilla/registrar';

      tipoPlanillaService.registrar(mockTipoPlanillaDTO).subscribe(resp => {
        expect(resp).toEqual(mockTipoPlanilla);
      })
      const req = httpMock.expectOne(url)
      expect(req.request.method).toBe('POST')
      req.flush(mockTipoPlanilla)
    }));

    it("Modificar TipoPlanilla", inject([HttpTestingController, TipoPlanillaService],
      (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
        const url = 'http://localhost:2000/api/tipoPlanilla/modificar';

        tipoPlanillaService.modificar(mockTipoPlanillaDTO).subscribe(resp => {
          expect(resp).toEqual(mockTipoPlanilla);
        })
        const req = httpMock.expectOne(url)
        expect(req.request.method).toBe('POST')
        req.flush(mockTipoPlanilla)
      }));

      it("Listar Perfiles Por tipo de Planilla", inject([HttpTestingController, TipoPlanillaService],
        (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
          const url = 'http://localhost:2000/api/tipoPlanilla/listarPorTipoPlanilla';

          tipoPlanillaService.listarPerfilesPorTipoPlanilla(mockTipoPlanillaDTO).subscribe(resp => {
            expect(resp).toEqual(mockTipoPlanilla);
          })
          const req = httpMock.expectOne(url)
          expect(req.request.method).toBe('POST')
          req.flush(mockTipoPlanilla)
        }));

        it("Actualizar Perfiles", inject([HttpTestingController, TipoPlanillaService],
          (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
            const url = 'http://localhost:2000/api/tipoPlanilla/modificarPlanillaPerfil';

            tipoPlanillaService.actualizarPerfiles(mockTipoPlanillaDTO).subscribe(resp => {
              expect(resp).toEqual(mockTipoPlanilla);
            })
            const req = httpMock.expectOne(url)
            expect(req.request.method).toBe('PUT')
            req.flush(mockTipoPlanilla)
          }));

          it("Eliminar TipoPlanilla", inject([HttpTestingController, TipoPlanillaService],
            (httpMock: HttpTestingController, tipoPlanillaService: TipoPlanillaService) => {
              const url = 'http://localhost:2000/api/tipoPlanilla/1';

              tipoPlanillaService.eliminar(tipoPlanilla).subscribe(resp => {
                expect(resp).toEqual(mockTipoPlanilla);
              })
              const req = httpMock.expectOne(url)
              expect(req.request.method).toBe('DELETE')
              req.flush(mockTipoPlanilla)
            }));

});

