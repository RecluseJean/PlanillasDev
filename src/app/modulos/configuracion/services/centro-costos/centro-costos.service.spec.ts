import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CentroCostosService } from './centro-costos.service';
import constCenCos from '../../../../mocks/centro-costosConstante';

describe("Cetro Costos Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CentroCostosService]
        }).compileComponents();
    }));

    describe("CentroCostosService", () => {
        it("Listar Centro Costos", inject(
            [HttpTestingController, CentroCostosService],
            (httpMock: HttpTestingController, cenCosService: CentroCostosService) => {
                const url = 'http://localhost:2000/api/centroCosto/porEmpresa';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                cenCosService.listarCentroCostosXEmpresa(tmp_cat.empresa).subscribe(resp => {
                    expect(resp).toEqual(constCenCos.lsCenCosto);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constCenCos.lsCenCosto)

            }
        ));
    });

    describe("CentroCostosService", () => {
        it("Registrar Centro Costos", inject(
            [HttpTestingController, CentroCostosService],
            (httpMock: HttpTestingController, cenCosService: CentroCostosService) => {
                const url = 'http://localhost:2000/api/centroCosto/insertar';
                var tmp_cat = {
                    "centroCosto":{
                        "descripcion": "Centro B"
                        },
                    "empresa": {
                      "idEmpresa": 1
                    }
                }
                cenCosService.insertarCentroCostos(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constCenCos.regCenCos);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constCenCos.regCenCos)

            }
        ));
    });

    describe("CentroCostosService", () => {
        it("Actualizar Centro Costos", inject(
            [HttpTestingController, CentroCostosService],
            (httpMock: HttpTestingController, cenCosService: CentroCostosService) => {
                const url = 'http://localhost:2000/api/centroCosto/actualizar';
                var tmp_cat = {
                    "centroCosto":{
                        "idCentroCosto": 1,
                        "descripcion": "Centro Z"
                        },
                    "empresa": {
                      "idEmpresa": 1
                    }
                }
                cenCosService.actualizarCentroCostos(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constCenCos.actCenCos);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constCenCos.actCenCos)

            }
        ));
    });

    describe("CentroCostosService", () => {
        it("Eliminar Centro Costos", inject(
            [HttpTestingController, CentroCostosService],
            (httpMock: HttpTestingController, cenCosService: CentroCostosService) => {
                var tmp_cat = {
                    "centroCosto":{
                        "idCentroCosto": 1
                    }
                }
                const url = 'http://localhost:2000/api/centroCosto/' + tmp_cat.centroCosto.idCentroCosto;
                cenCosService.eliminarCentroCostos(tmp_cat.centroCosto).subscribe((resp:any) => {
                    expect(resp).toEqual(constCenCos.eliCenCos);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('DELETE')
                req.flush(constCenCos.eliCenCos)

            }
        ));
    });

});