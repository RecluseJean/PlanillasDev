import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RolService } from './roles.service';

describe('RolService', () => {
    var actualLsPerfil;
    const mockResponselsPerfiles = ConstantesDatosPrueba.ResponseWrapperListaPerfil;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],

            providers: [
                RolService
            ]
        }).compileComponents();
    }));

    describe('Obtener ResponseWraper de ListarPerfiles con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, RolService], (httpMock: HttpTestingController, rolService: RolService) => {
                const url = 'http://localhost:2000/api/modulo/listarPerfiles';
                rolService.listarPerfiles()
                    .subscribe(
                        (res) => {
                            actualLsPerfil = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselsPerfiles);
                expect(actualLsPerfil).toEqual(mockResponselsPerfiles);
                expect(req.request.method).toBe('GET');
            })
        );
    });
});