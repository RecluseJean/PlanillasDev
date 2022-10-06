import { NuevoPasswordConfirmarComponent } from './nuevo-password-confirmar.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { UsuarioServiceStub } from '../../../../../../mocks/services/usuario.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';
import { Observable } from 'rxjs/Observable';

describe('NuevoPasswordConfirmarComponent', () => {
    let component: NuevoPasswordConfirmarComponent;
    let fixture: ComponentFixture<NuevoPasswordConfirmarComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          NuevoPasswordConfirmarComponent
        ],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          NgbModule.forRoot()
        ],
        providers: [
          { provide: UsuarioService, useClass: UsuarioServiceStub },
          NgbActiveModal
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(NuevoPasswordConfirmarComponent);
      component = fixture.componentInstance;
      component.input_usuario = {"usuario":ConstantesDatosPrueba.usuarioPrueba1};
      component.input_old_pass = "old";
      fixture.detectChanges();
    }))
  
    describe('Creacion del component', () => {
      it('Deberia crearse el componente NuevoPasswordConfirmar', async(() => {
        const fixture = TestBed.createComponent(NuevoPasswordConfirmarComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      }));
    });

    describe('Prueba metodo ngOnInit',()=>{
      it('Deberia llamar al metodo validar antiguo',()=>{
        spyOn(component,'validarAntiguo').and.callThrough();
        component.ngOnInit();
        expect(component.validarAntiguo).toHaveBeenCalled();
      });
    });

    describe('Prueba metodo close',()=>{
      it('Deberia llamarse al metodo desde el template',()=>{
        spyOn(component,'close').and.callThrough();
        spyOn(component.activemodal,'close').and.callThrough();
        const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
        button.click();
        expect(component.close).toHaveBeenCalled();
        expect(component.activemodal.close).toHaveBeenCalled();
      });
    });

    describe('Prueba metodo validarAntiguo',()=>{
      it('Deberia setearse en true a variable antiguoCorrecto si existe el usuario',()=>{
        spyOn(component.usuarioService,'login').and.callThrough();
        component.validarAntiguo();
        expect(component.antiguoCorrecto).toBeTruthy();
      });

      it('Deberia setearse en false a variable antiguoCorrecto si no existe el usuario',()=>{
        spyOn(component.usuarioService,'login').and.returnValue(Observable.throw('error'))
        component.validarAntiguo();
        expect(component.antiguoCorrecto).toBeFalsy();
      });
    });

    describe('Prueba metodo actualizarContraseña',()=>{
      it('Deberia actualizar la contraseña si antiguo Correcto es true',()=>{
        component.antiguoCorrecto = true;
        component.objUsuario_final = 1;
        spyOn(component.usuarioService,'actualizarUsuario').and.callThrough();
        spyOn(component,'refrescar').and.callThrough();
        component.actualizarContrasena();
        expect(component.refrescar).toHaveBeenCalled();
        expect(component.usuarioService.actualizarUsuario).toHaveBeenCalled();
      })

      it('Deberia mostrar alerta de error si antiguo Correcto es true pero fallo en el back',()=>{
        component.antiguoCorrecto = true;
        component.objUsuario_final = 0;
        spyOn(component.usuarioService,'actualizarUsuario').and.callThrough();
        spyOn(component,'refrescar').and.callThrough();
        component.actualizarContrasena();
        expect(component.refrescar).toHaveBeenCalled();
        expect(component.usuarioService.actualizarUsuario).toHaveBeenCalled();
      })

      it('Deberia mostrar alerta de Contraseña incorrecta si antiguoCorrecto es false',()=>{
        component.antiguoCorrecto = false;
        spyOn(component.activemodal,'close').and.callThrough();
        component.actualizarContrasena();
        expect(component.activemodal.close).toHaveBeenCalled();
      })
    })

});