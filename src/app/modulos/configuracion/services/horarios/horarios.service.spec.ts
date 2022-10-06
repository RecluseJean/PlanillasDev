import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HorarioService } from './horarios.service';
import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';

describe('HorarioService', () => {

    var actuallsHorxEmp, actualregHorario,actualActHor;
    const empresa = ConstantesDatosPrueba.empresa1;
    const horario = ConstantesDatosPrueba.horario;
    const mockResponselistaHorxEmpresa = ConstantesDatosPrueba.ResponseWrapperListaHorario;
    const mockResponseRegHor = ConstantesDatosPrueba.ResponseWrapperRegistrarHorario;
    const mockResponseActHor = ConstantesDatosPrueba.ResponseWrapperActualizarHorario;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [HorarioService],
        });
    });

    it('should be created', inject([HorarioService], (service: HorarioService) => {
        expect(service).toBeTruthy();
    }));

    describe('Obtener ResponseWrapper de listarHorariosPorEmpresa con POST del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, HorarioService], (httpMock: HttpTestingController, horarioService: HorarioService) => {
                const url = 'http://localhost:2000/api/horario/listarXempresa';
                horarioService.listarHorariosPorEmpresa(empresa)
                    .subscribe(
                        (res) => {
                            actuallsHorxEmp = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponselistaHorxEmpresa);
                expect(actuallsHorxEmp).toEqual(mockResponselistaHorxEmpresa);
                expect(req.request.method).toBe('POST');
            }))
    })

    describe('Obtener ResponseWrapper de registrarHorario con POST del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, HorarioService], (httpMock: HttpTestingController, horarioService: HorarioService) => {
                const url = 'http://localhost:2000/api/horario/insertar';
                horarioService.registrarHorario(horario)
                    .subscribe(
                        (res: any) => {
                            actualregHorario = res.defaultObj;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseRegHor);
                expect(actualregHorario).toEqual(mockResponseRegHor.defaultObj);
                expect(req.request.method).toBe('POST');
            }))
    })

    describe('Obtener ResponseWrapper de actualizarHorario con PUT del back', () => {
        it('ObjetoResponseWrapper esperado',
            inject([HttpTestingController, HorarioService], (httpMock: HttpTestingController, horarioService: HorarioService) => {
                const url = 'http://localhost:2000/api/horario/actualizar';
                horarioService.actualizarHorario(horario)
                    .subscribe(
                        (res) => {
                            actualActHor = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponseActHor);
                expect(actualActHor).toEqual(mockResponseActHor);
                expect(req.request.method).toBe('PUT');
            }))
    })
});