import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import ConstantesDatosPrueba from '../../mocks/ConstantesMockito';
import { SidebarService } from './sidebar.service';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';

describe('SiderBarService',()=>{

    const mockResponseModulo = ConstantesDatosPrueba.ResponseWrapperModuloAdmin;


    beforeEach(async(()=> {

        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,
                    RouterTestingModule
                ],

          providers: [SidebarService, UsuarioService],

          declarations: [ AppComponent]
        })
        .compileComponents();
      }));

      describe('Obtener ResponseWraper de CargarPaginasPerfil con POST del Back', () => {
          
        it('Objeto ResponseWraper esperado',
        inject([HttpTestingController, SidebarService], (httpMock: HttpTestingController, _sidebarService: SidebarService) => {
          const url = 'http://localhost:2000/api/modulo';
          _sidebarService.cargarPaginasPerfil({"idPerfil":1})
          .subscribe(
            (res) => {
              expect(res).toEqual(mockResponseModulo);
            }
          );
          
          const req = httpMock.expectOne(url);
          expect(req.request.method).toBe('POST');
          req.flush(mockResponseModulo);
        })
      );
      });

});