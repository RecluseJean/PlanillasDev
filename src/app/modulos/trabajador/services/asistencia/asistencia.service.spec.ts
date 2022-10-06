import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AsistenciaService } from './asistencia.service';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { Observable } from 'rxjs/Observable';

describe('AsistenciaService', () => {
    var actuallsAsistXTrab, actualCRUDAsist, actualError;

    const mockResponselsAsistencia = ConstantesDatosPrueba.ResponseWrapperListaAsistencias;
    const mockResponseCRUDAsistencia = ConstantesDatosPrueba.ResponseWrapperCRUDAsistencia;

    const trabajador = ConstantesDatosPrueba.TrabajadorSinContrato;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;
    const asistencia = ConstantesDatosPrueba.asistencia;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                RouterTestingModule
            ],

            providers: [AsistenciaService],

            declarations: []
        })
            .compileComponents();
    }));

    describe('Obtener ResponseWraper de ListarAsistencias con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                const url = 'http://localhost:2000/api/asistencia/listarXTrabajador';
                asistenciaService.listarAsistenciasPorTrabajador(trabajador, año, mes)
                    .subscribe(
                        (res) => {
                            actuallsAsistXTrab = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselsAsistencia);
                expect(actuallsAsistXTrab).toEqual(mockResponselsAsistencia);
                expect(req.request.method).toBe('POST');
            })
        );
    });

    describe('Obtener ResponseEntity de registrarAsistencia con POST del Back', () => {
        it('Objeto ResponseEntity esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                const url = 'http://localhost:2000/api/asistencia/registrar';
                asistenciaService.registrarAsistencia(asistencia)
                    .subscribe(
                        (res) => {
                            actualCRUDAsist = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDAsistencia);
                expect(actualCRUDAsist).toEqual(mockResponseCRUDAsistencia);
                expect(req.request.method).toBe('POST');
            }));

        it('Error 400 esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                var success;
                var error = {
                    'status': 400,
                    'error': {
                        'errores': ["fecha no puede ser null", "fecha de inicio no puede ser null"]
                    }
                }
                spyOn(asistenciaService.http, 'post').and.returnValue(Observable.throw(error))
                asistenciaService.registrarAsistencia(asistencia).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(asistenciaService.http.post).toHaveBeenCalled();
                expect(asistenciaService.listaErrores.length).toBeGreaterThan(0);
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));

        it('Otro tipo de error esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                var success;
                var error = {
                    'status': 500,
                    'error': {
                        'error': "No se pudo conectar con el Back"
                    }
                }
                spyOn(asistenciaService.http, 'post').and.returnValue(Observable.throw(error))
                asistenciaService.registrarAsistencia(asistencia).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(asistenciaService.http.post).toHaveBeenCalled();
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));
    });

    describe('Obtener ResponseWrapper de actualizarAsistencia con PUT del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                const url = 'http://localhost:2000/api/asistencia/modificar';
                asistenciaService.actualizarAsistencia(asistencia)
                    .subscribe(
                        (res) => {
                            actualCRUDAsist = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDAsistencia);
                expect(actualCRUDAsist).toEqual(mockResponseCRUDAsistencia);
                expect(req.request.method).toBe('PUT');
            }));
    });

    describe('Obtener ResponseWrapper de eliminarAsistencia con DELETE del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                const url = 'http://localhost:2000/api/asistencia/1';
                asistenciaService.eliminarAsistencia(1)
                    .subscribe(
                        (res) => {
                            actualCRUDAsist = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDAsistencia);
                expect(actualCRUDAsist).toEqual(mockResponseCRUDAsistencia);
                expect(req.request.method).toBe('DELETE');
            }));
    });

    describe('Obtener ResponseWrapper de buscarFecha con POST del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, AsistenciaService], (httpMock: HttpTestingController, asistenciaService: AsistenciaService) => {
                const url = 'http://localhost:2000/api/asistencia/buscarFecha';
                asistenciaService.buscarFecha(asistencia)
                    .subscribe(
                        (res) => {
                            actualCRUDAsist = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDAsistencia);
                expect(actualCRUDAsist).toEqual(mockResponseCRUDAsistencia);
                expect(req.request.method).toBe('POST');
            }));
    });
});