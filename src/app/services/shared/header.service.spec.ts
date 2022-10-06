import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


import { HeaderService} from '../service.index';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import ConstantesDatosPrueba from '../../mocks/ConstantesMockito';

describe('HeaderService',()=>{

    const mockResponseEmpresa = ConstantesDatosPrueba.ResponseWrapperListaEmpresas;
    const mockResponseAño = ConstantesDatosPrueba.ResponseWrapperListaAñoEmpresa2;
    const mockResponseMes = ConstantesDatosPrueba.ResponseWrapperListaMeses;
    const empresa = ConstantesDatosPrueba.empresa1;

    beforeEach(async(()=> {

        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,
                    RouterTestingModule
                ],

          providers: [HeaderService],

          declarations: [ AppComponent]
        })
        .compileComponents();
      }));

      describe('Obtener ResponseWraper de listarEmpresa con GET del Back', () => {
          
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, HeaderService], (httpMock: HttpTestingController, _headerService: HeaderService) => {
          const url = 'http://localhost:2000/api/empresa/listar';
          _headerService.listarEmpresa()
          .subscribe(
            (res) => {
              expect(res).toEqual(mockResponseEmpresa);
            }
          );
          const req = httpMock.expectOne(url);
          expect(req.request.method).toBe('GET');
          req.flush(mockResponseEmpresa);
        })
      );
      });

      describe('Obtener ResponseWraper de listarAño con POST del Back', () => {
          
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, HeaderService], (httpMock: HttpTestingController, _headerService: HeaderService) => {
          const url = 'http://localhost:2000/api/anomes/listarPorEmpresa';
          _headerService.listarAno(empresa)
          .subscribe(
            (res) => {
              expect(res).toEqual(mockResponseAño);
            }
          );
          const req = httpMock.expectOne(url);
          expect(req.request.method).toBe('POST');
          req.flush(mockResponseAño);
        })
      );
      });

    
      describe('Obtener ResponseWraper de listarMeses con GET del Back', () => {
          
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, HeaderService], (httpMock: HttpTestingController, _headerService: HeaderService) => {
          const url = 'http://localhost:2000/api/anomes/listarMeses';
          _headerService.listarMeses()
          .subscribe(
            (res) => {
              expect(res).toEqual(mockResponseMes);
            }
          );
          const req = httpMock.expectOne(url);
          expect(req.request.method).toBe('GET');
          req.flush(mockResponseMes);
        })
      );
      });

});