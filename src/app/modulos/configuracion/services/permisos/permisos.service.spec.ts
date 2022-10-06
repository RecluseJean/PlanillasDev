import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { TiposPermisoService } from './permisos.service';

describe('PermisoService', () => {

    var actuallsTipoPer, actualRegTipPerm, actualActTipPerm,eliminar;
    const empresa = ConstantesDatosPrueba.empresa1;
    const permiso = ConstantesDatosPrueba.horario;
    const mockResponselistaPermisoXEmp = ConstantesDatosPrueba.ResponseWrapperListaTipoPermisos;
    const mockResponseRegTipPerm = ConstantesDatosPrueba.ResponseWrapperRegTipoPermiso;
    const mockResponseActTipPerm = ConstantesDatosPrueba.ResponseWrapperActTipoPermiso;
    const mockResponseElimTipPerm = {
        "estado": 1,
        "msg":"Tipo de Permiso eliminado correctamente",
        "defaultObj":true
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [TiposPermisoService],
        });
    });

    it('should be created', inject([TiposPermisoService], (service: TiposPermisoService) => {
        expect(service).toBeTruthy();
    }));

    describe('Obtener ResponseWrapper de listarPermisosPorEmpresa con POST del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, TiposPermisoService], (httpMock: HttpTestingController, permisoService: TiposPermisoService) => {
                const url = 'http://localhost:2000/api/tipoPermiso/listarXEmpresa';
                permisoService.listarPermisosPorEmpresa(empresa)
                    .subscribe(
                        (res) => {
                            actuallsTipoPer = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselistaPermisoXEmp);
                expect(actuallsTipoPer).toEqual(mockResponselistaPermisoXEmp);
                expect(req.request.method).toBe('POST');
            }))
    });

    describe('Obtener ResponseWrapper de registrarPermiso con POST del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, TiposPermisoService], (httpMock: HttpTestingController, permisoService: TiposPermisoService) => {
                const url = 'http://localhost:2000/api/tipoPermiso/registrar';
                permisoService.registrarPermiso(permiso)
                    .subscribe(
                        (res) => {
                            actualRegTipPerm = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseRegTipPerm);
                expect(actualRegTipPerm).toEqual(mockResponseRegTipPerm);
                expect(req.request.method).toBe('POST');
            }))
    })

    
    describe('Obtener ResponseWrapper de actualizarPermiso con PUT del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, TiposPermisoService], (httpMock: HttpTestingController, permisoService: TiposPermisoService) => {
                const url = 'http://localhost:2000/api/tipoPermiso/modificar';
                permisoService.actualizarPermiso(permiso)
                    .subscribe(
                        (res) => {
                            actualActTipPerm = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseActTipPerm);
                expect(actualActTipPerm).toEqual(mockResponseActTipPerm);
                expect(req.request.method).toBe('PUT');
            }))
    })

    
    describe('Obtener ResponseWrapper de eliminarPermiso con DELETE del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, TiposPermisoService], (httpMock: HttpTestingController, permisoService: TiposPermisoService) => {
                const url = 'http://localhost:2000/api/tipoPermiso/1';
                permisoService.eliminarPermiso(1)
                    .subscribe(
                        (res:any) => {
                            eliminar = res.defaultObj;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseElimTipPerm);
                expect(eliminar).toBeTruthy();
                expect(req.request.method).toBe('DELETE');
            }))
    })
});