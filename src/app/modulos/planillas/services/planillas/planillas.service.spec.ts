import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PlanillasService } from './planillas.service';
import constPlanilla from "../../../../mocks/planillaConstante";
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';

describe("Planillas Service", () => {

    const respFile = ConstantesDatosPrueba.File;
    const mockResponse = ConstantesDatosPrueba.TrabajadorSinContrato;
    const trabajador = ConstantesDatosPrueba.Trabajador1;
    const planDTO = ConstantesDatosPrueba.planilla;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PlanillasService]
        }).compileComponents();
    }));

    describe("PlanillasService", () => {
        it("Listar Trabajadores", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/trabajador/porEmpresa';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                };
                planService.listarTrabajador(tmp_cat.empresa).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.lsTrabajador);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.lsTrabajador)
            }
        ));
    });


    describe("PlanillasService", () => {
        it("Obtener tipo tardanza", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/parametro/obtenerTipoTard';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                };
                planService.obtenerTipoTardanza(tmp_cat.empresa).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.obtTipoTardanza);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.obtTipoTardanza)
            }
        ));
    });

    describe("PlanillasService", () => {
        it("Obtener tipo rango", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/parametro/obtenerTipoTardRango';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                };
                planService.obtenerTipoRango(tmp_cat.empresa).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.obtTipoRango);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.obtTipoRango)
            }
        ));
    });

    describe("PlanillasService", () => {
        it("Listar boletas", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/planilla/listarBoletas';
                var tmp_cat = {
                    "contrato": {
                        "idContrato": 3
                    }
                }
                planService.listarBoletas(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.lsBoletas);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.lsBoletas)
            }
        ));
    });

    describe("PlanillasService", () => {
        it("Eliminar planilla", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                var tmp_cat = {
                    "planilla": {
                        "idPlanillaHistorico": 7
                    }
                }
                const url = 'http://localhost:2000/api/planilla/' + tmp_cat.planilla.idPlanillaHistorico;
                planService.eliminarPlanilla(tmp_cat.planilla).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.eliPlanilla);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('DELETE');
                req.flush(constPlanilla.eliPlanilla)
            }
        ));
    });


    describe("PlanillasService", () => {
        it("Encontrar Planilla", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/planilla/buscarPlanilla';
                var tmp_cat = {
                    "planilla": {
                        "pdo_ano": {
                            "idPdoAno": 6
                        },
                        "pdo_mes": {
                            "idPdoMes": 2
                        }
                    },
                    "contrato": {
                        "idContrato": 5
                    }
                }
                planService.encontrarPlanilla(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.encontrarPlanilla);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.encontrarPlanilla)
            }
        ));
    });


    describe("PlanillasService", () => {
        it("Generar Planilla", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/planilla/generarPlanilla';
                var tmp_cat = constPlanilla.genPlanilla;
                planService.generarPlanilla(tmp_cat).subscribe((resp: any) => {
                    expect(resp).toEqual(constPlanilla.respGenPlanilla);
                });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.respGenPlanilla)
            }
        ));
    });

    describe("Prueba metodo Listar Trabajadores", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/trabajador/porEmpresayTipoComprobante/1';
                var tmp_cat = {
                    "empresa": {
                        "idEmpresa": 1
                    }
                };
                planService.listarTrabajadorPorComprobante(tmp_cat.empresa, 1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(constPlanilla.lsTrabajador);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(constPlanilla.lsTrabajador)
            }
        ));
    });

    describe("Prueba metodo reportes", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/reporte/pdf';
                var tmp_obj = {
                    "idTrabajador": 1,
                    "idPdoAno": 1,
                    "idPdoMes": 2
                }
                var repor = new ArrayBuffer(5000);
                planService.reportes(tmp_obj)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(repor);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(repor);
            }
        ));
    });

    describe("Prueba metodo subir Archivo", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/suspencion/subirArchivo/1';
                var archivo: File;
                planService.subirArchivo(archivo, 1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(respFile);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(respFile)
            }
        ));
    });

    describe("Prueba metodo Listar Ult", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/rhe/listarUltimos';
                var tmp_trab = ConstantesDatosPrueba.Trabajador1;
                planService.listarUlt(tmp_trab)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(mockResponse);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });

    describe("Prueba metodo Eliminar RHE", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/rhe/1';
                planService.eliminarRHE(1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(mockResponse);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('DELETE');
                req.flush(mockResponse)
            }
        ));
    });

    describe("Prueba metodo registrar RHE", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/rhe/registrar/1/1/1';
                var archivo: File;
                planService.registrarRHE(archivo, 1, 1, 1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(respFile);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(respFile)
            }
        ));
    });

    describe("Prueba metodo Listar RHEs", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/rhe/listarRHEs';
                planService.listarRHEs(planDTO)
                    .subscribe((resp: any) => {
                        expect(resp).toEqual(mockResponse);
                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });

    describe("Prueba metodo descargar RHE", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/rhe/descargar/1';
                var rhe = new ArrayBuffer(5000);
                planService.descargarRHE(1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(rhe);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('GET');
                req.flush(rhe);
            }
        ));
    });

    describe("Prueba metodo RegistrarSolicitud", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/adelantoSueldo/registrarSolicitud';
                planService.registarSolicitud({})
                    .subscribe((resp: any) => {
                        expect(resp).toEqual(mockResponse);
                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });
    
    describe("Prueba metodo Listar AdeSue", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/adelantoSueldo/listarAdeSueldo';
                planService.listarAdeSue({})
                    .subscribe((resp: any) => {
                        expect(resp).toEqual(mockResponse);
                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });

    describe("Prueba metodo Listar Cuotas", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/adelantoSueldo/listarCuotas';
                planService.listarCuotas({})
                    .subscribe((resp: any) => {
                        expect(resp).toEqual(mockResponse);
                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });
    
    describe("Prueba metodo Listar Deuda", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/adelantoSueldo/listarDeuda';
                planService.listarDeuda({})
                    .subscribe((resp: any) => {
                        expect(resp).toEqual(mockResponse);
                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(mockResponse)
            }
        ));
    });
    

    describe("Prueba metodo subirArchivo AdelantoSueldo", () => {
        it("Deberia retornar un valor en especifico con la ruta correcta", inject(
            [HttpTestingController, PlanillasService],
            (httpMock: HttpTestingController, planService: PlanillasService) => {
                const url = 'http://localhost:2000/api/adelantoSueldo/subirArchivo/1';
                var archivo: File;
                planService.subirArchivoAdelantoSueldo(archivo,1)
                    .subscribe((resp: any) => {

                        expect(resp).toEqual(respFile);

                    });
                const req = httpMock.expectOne(url);
                expect(req.request.method).toBe('POST');
                req.flush(respFile)
            }
        ));
    });
});