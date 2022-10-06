import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermisoService } from './permiso.service';
import { Observable } from 'rxjs/Observable';

describe('PermisoService', () => {
    var actuallsPermitXTrab, actualCRUDPermi, actualError;

    const mockResponselsPermiso = ConstantesDatosPrueba.ResponseWrapperListaPermisos;
    const mockResponseCRUDpermiso = ConstantesDatosPrueba.ResponseWrapperCRUDPermiso;

    const trabajador = ConstantesDatosPrueba.TrabajadorSinContrato;
    const año = ConstantesDatosPrueba.añoPrueba1;
    const mes = ConstantesDatosPrueba.MesPrueba1;
    const permiso = ConstantesDatosPrueba.permiso;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],

            providers: [PermisoService],

            declarations: []
        })
            .compileComponents();
    }));

    describe('Obtener ResponseWraper de ListarPermisos con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                const url = 'http://localhost:2000/api/permiso/listarXTrabajador';
                PermisoService.listarPermisosPorTrabajador(trabajador, año, mes)
                    .subscribe(
                        (res) => {
                            actuallsPermitXTrab = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselsPermiso);
                expect(actuallsPermitXTrab).toEqual(mockResponselsPermiso);
                expect(req.request.method).toBe('POST');
            })
        );
    });

    describe('Obtener ResponseEntity de registrarpermiso con POST del Back', () => {
        it('Objeto ResponseEntity esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                const url = 'http://localhost:2000/api/permiso/registrar';
                PermisoService.registrarPermiso(permiso)
                    .subscribe(
                        (res) => {
                            actualCRUDPermi = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDpermiso);
                expect(actualCRUDPermi).toEqual(mockResponseCRUDpermiso);
                expect(req.request.method).toBe('POST');
            }));

        it('Error 400 esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                var success;
                var error = {
                    'status': 400,
                    'error': {
                        'errores': ["fecha no puede ser null", "fecha de inicio no puede ser null"]
                    }
                }
                spyOn(PermisoService.http, 'post').and.returnValue(Observable.throw(error))
                PermisoService.registrarPermiso(permiso).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(PermisoService.http.post).toHaveBeenCalled();
                expect(PermisoService.listaErrores.length).toBeGreaterThan(0);
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));

        it('Otro tipo de error esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                var success;
                var error = {
                    'status': 500,
                    'error': {
                        'error': "No se pudo conectar con el Back"
                    }
                }
                spyOn(PermisoService.http, 'post').and.returnValue(Observable.throw(error))
                PermisoService.registrarPermiso(permiso).subscribe(
                    (res) => {
                        success = res;
                    },
                    (error) => {
                        actualError = error;
                    }
                );;
                expect(PermisoService.http.post).toHaveBeenCalled();
                expect(actualError).toEqual(error);
                expect(success).toBeUndefined();
            }));
    });

    describe('Obtener ResponseWrapper de actualizarpermiso con PUT del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                const url = 'http://localhost:2000/api/permiso/modificar';
                PermisoService.actualizarPermiso(permiso)
                    .subscribe(
                        (res) => {
                            actualCRUDPermi = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDpermiso);
                expect(actualCRUDPermi).toEqual(mockResponseCRUDpermiso);
                expect(req.request.method).toBe('PUT');
            }));
    });

    describe('Obtener ResponseWrapper de eliminarpermiso con DELETE del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                const url = 'http://localhost:2000/api/permiso/1';
                PermisoService.eliminarPermiso(1)
                    .subscribe(
                        (res) => {
                            actualCRUDPermi = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDpermiso);
                expect(actualCRUDPermi).toEqual(mockResponseCRUDpermiso);
                expect(req.request.method).toBe('DELETE');
            }));
    });

    describe('Obtener ResponseWrapper de buscarFecha con POST del Back', () => {
        it('Objeto ResponseWrapper esperado',
            inject([HttpTestingController, PermisoService], (httpMock: HttpTestingController, PermisoService: PermisoService) => {
                const url = 'http://localhost:2000/api/permiso/buscarFecha';
                PermisoService.buscarFecha(permiso)
                    .subscribe(
                        (res) => {
                            actualCRUDPermi = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseCRUDpermiso);
                expect(actualCRUDPermi).toEqual(mockResponseCRUDpermiso);
                expect(req.request.method).toBe('POST');
            }));
    });
});