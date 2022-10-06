import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaltaService } from './faltas.service';
import { Observable } from 'rxjs/Observable';


describe('FaltaService', () => {
    var actuallsFalXTrab, actualCRUDFalt, actualError;

    const mockResponselsFalta = ConstantesDatosPrueba.ResponseWrapperListaFaltas;
    const mockResponseCRUDFalta = ConstantesDatosPrueba.ResponseWrapperCRUDFalta;

    const trabajador = ConstantesDatosPrueba.TrabajadorSinContrato;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;
    const falta = ConstantesDatosPrueba.falta;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                RouterTestingModule
            ],

            providers: [FaltaService],

            declarations: []
        })
            .compileComponents();
    }));

    describe('Obtener ResponseWraper de ListarFaltas con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, FaltaService: FaltaService) => {
                const url = 'http://localhost:2000/api/falta/listarXTrabajador';
                FaltaService.listarFaltasPorTrabajador(trabajador, año, mes)
                    .subscribe(
                        (res) => {
                            actuallsFalXTrab = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselsFalta);
                expect(actuallsFalXTrab).toEqual(mockResponselsFalta);
                expect(req.request.method).toBe('POST');
            })
        );
    });

    describe('Obtener ResponseEntity de registrarfalta con POST del Back', () => {
        it('Objeto ResponseEntity esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                const url = 'http://localhost:2000/api/falta/registrar';
                faltaService.registrarFalta(falta)
                    .subscribe(
                        (res) => {
                            actualCRUDFalt = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDFalta);
                expect(actualCRUDFalt).toEqual(mockResponseCRUDFalta);
                expect(req.request.method).toBe('POST');
            }));

        it('Error 400 esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                var success;
                var error = {
                    'status': 400,
                    'error': {
                        'errores': ["fecha no puede ser null", "fecha de inicio no puede ser null"]
                    }
                }
                spyOn(faltaService.http, 'post').and.returnValue(Observable.throw(error))
                faltaService.registrarFalta(falta).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(faltaService.http.post).toHaveBeenCalled();
                expect(faltaService.listaErrores.length).toBeGreaterThan(0);
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));

        it('Otro tipo de error esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                var success;
                var error = {
                    'status': 500,
                    'error': {
                        'error': "No se pudo conectar con el Back"
                    }
                }
                spyOn(faltaService.http, 'post').and.returnValue(Observable.throw(error))
                faltaService.registrarFalta(falta).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(faltaService.http.post).toHaveBeenCalled();
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));
    });

    describe('Obtener ResponseWrapper de actualizarfalta con PUT del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                const url = 'http://localhost:2000/api/falta/modificar';
                faltaService.actualizarFalta(falta)
                    .subscribe(
                        (res) => {
                            actualCRUDFalt = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDFalta);
                expect(actualCRUDFalt).toEqual(mockResponseCRUDFalta);
                expect(req.request.method).toBe('PUT');
            }));
    });

    describe('Obtener ResponseWrapper de eliminarfalta con DELETE del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                const url = 'http://localhost:2000/api/falta/1';
                faltaService.eliminarFalta(1)
                    .subscribe(
                        (res) => {
                            actualCRUDFalt = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDFalta);
                expect(actualCRUDFalt).toEqual(mockResponseCRUDFalta);
                expect(req.request.method).toBe('DELETE');
            }));
    });

    describe('Obtener ResponseWrapper de buscarFecha con POST del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, FaltaService], (httpMock: HttpTestingController, faltaService: FaltaService) => {
                const url = 'http://localhost:2000/api/falta/buscarFecha';
                faltaService.buscarFecha(falta)
                    .subscribe(
                        (res) => {
                            actualCRUDFalt = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDFalta);
                expect(actualCRUDFalt).toEqual(mockResponseCRUDFalta);
                expect(req.request.method).toBe('POST');
            }));
    });
});