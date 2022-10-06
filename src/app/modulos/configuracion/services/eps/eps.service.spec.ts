import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EpsService } from './eps.service';
import constEps from '../../../../mocks/epsConstante';

describe("Eps Service", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EpsService]
        }).compileComponents();
    }));

    describe("EpsService", () => {
        it("Listar Eps", inject(
            [HttpTestingController, EpsService],
            (httpMock: HttpTestingController, epsService: EpsService) => {
                const url = 'http://localhost:2000/api/eps/listarXEmpresa';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                }
                epsService.listarEps(tmp_cat.empresa).subscribe(resp => {
                    expect(resp).toEqual(constEps.lsEfps);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constEps.lsEfps)

            }
        ));
    });

    describe("EpsService", () => {
        it("Registrar Eps", inject(
            [HttpTestingController, EpsService],
            (httpMock: HttpTestingController, epsService: EpsService) => {
                const url = 'http://localhost:2000/api/eps/insertar';
                var tmp_cat = {
                    "descripcion": "COLSANITAS PERU S.A.  EPS",
                    "aporte": 0.0225,
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "Partner Tech",
                        "ruc": "12121212121",
                        "estado": 1,
                        "fechaRegistro": "2020-01-08T16:30:45.766+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 3,
                            "descripcion": "MEDIANA EMPRESA"
                        }
                    }

                }
                epsService.insertarEps(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constEps.regEps);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constEps.regEps)

            }
        ));
    });


    describe("EpsService", () => {
        it("Actualizar Eps", inject(
            [HttpTestingController, EpsService],
            (httpMock: HttpTestingController, epsService: EpsService) => {
                const url = 'http://localhost:2000/api/eps/actualizar';
                var tmp_cat = {
                    "idEps": 28,
                    "descripcion": "COLSANITAS PERU S.A.",
                    "aporte": 0.0225,
                    "empresa": {
                        "idEmpresa": 1,
                        "razonSocial": "Partner Tech",
                        "ruc": "12121212121",
                        "estado": 1,
                        "fechaRegistro": "2020-01-08T16:30:45.766+0000",
                        "urlImagen": null,
                        "logo": null,
                        "companyLimit": 0.0,
                        "regTrib": {
                            "idRegTrib": 1,
                            "descripcion": "NRUS - Nuevo Régimen Único Simplificado"
                        },
                        "limiteAutorizacion": null,
                        "tipoEmp": {
                            "idTipoEmp": 3,
                            "descripcion": "MEDIANA EMPRESA"
                        }
                    }

                }
                epsService.actualizarEps(tmp_cat).subscribe(resp => {
                    expect(resp).toEqual(constEps.actEps);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('POST')
                req.flush(constEps.actEps)

            }
        ));
    });

    describe("EpsService", () => {
        it("Eliminar Eps", inject(
            [HttpTestingController, EpsService],
            (httpMock: HttpTestingController, epsService: EpsService) => {
                const url = 'http://localhost:2000/api/eps/1';
                epsService.eliminarEps({'idEps':1})
                .subscribe(resp => {
                    expect(resp).toEqual(constEps.eliEps);
                })
                const req = httpMock.expectOne(url)
                expect(req.request.method).toBe('DELETE')
                req.flush(constEps.eliEps)
            }
        ));
    });

});