import { NuevoPasswordComponent } from './nuevo-password.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { NuevoPasswordConfirmarComponent } from '../nuevo-password-confirmar/nuevo-password-confirmar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { UsuarioServiceStub } from '../../../../../../mocks/services/usuario.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';

describe('NuevoPasswordComponent', () => {
    let component: NuevoPasswordComponent;
    let fixture: ComponentFixture<NuevoPasswordComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          NuevoPasswordComponent,
          NuevoPasswordConfirmarComponent
        ],
        imports: [
          RouterTestingModule,
          FormsModule,
          NgbModule.forRoot()
        ],
        providers: [
          { provide: UsuarioService, useClass: UsuarioServiceStub },
          NgbActiveModal,
          NgbModal,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NuevoPasswordConfirmarComponent] } })
        .compileComponents();
  
      fixture = TestBed.createComponent(NuevoPasswordComponent);
      component = fixture.componentInstance;
      component.input_usuario = ConstantesDatosPrueba.usuarioPrueba1;
      fixture.detectChanges();
    }))
  
    describe('Creacion del component', () => {
      it('Deberia crearse el componente NuevoPassword', async(() => {
        const fixture = TestBed.createComponent(NuevoPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      }))
    });

    describe('Prueba metodo close',()=>{
        it('Deberia llamarse el metodo desde el template',()=>{
            spyOn(component,'close').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })

        it('Deberia cerrarse el modal y refrescar la pagina',()=>{
            spyOn(component.activemodal,'dismiss').and.callThrough();
            spyOn(component,'refrescar').and.callThrough();
            component.close();
            expect(component.activemodal.dismiss).toHaveBeenCalled();
            expect(component.refrescar).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo verificar Contraseña',()=>{
        it('Deberia setearse validar con true si la contraseña y verificar son iguales',()=>{
            component.usuario.password = 'contra';
            component.confirm = 'contra';
            component.verificarContrasena('contra');
            expect(component.validar).toBeTruthy();    
        })

        it('Deberia setearse validar con false si la contraseña y verificar no son iguales',()=>{
            component.usuario.password = 'contra123';
            component.confirm = 'contra';
            component.verificarContrasena('contra');
            expect(component.validar).toBeFalsy();    
        })

        it('Deberia setearse las variables con null si se borra en el input',()=>{
            component.verificarContrasena(null);
            expect(component.confirm).toEqual('');
            expect(component.validar).toBeTruthy();
            expect(component.usuario.password).toEqual(''); 
        })
    })

    describe('Prueba metodo confirmarNuevoPass',()=>{
        it('Deberia llamar el metodo desde el template',()=>{
            spyOn(component,'confirmarNuevoPass').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#confirmar');
            button.click();
            expect(component.confirmarNuevoPass).toHaveBeenCalled();
        })

        it('Deberia crearse el modal',()=>{
            spyOn(component.modalService,'open').and.callThrough();
            component.confirmarNuevoPass();
            expect(component.modalService.open).toHaveBeenCalled();
        })

        it('Deberia cerrarse el modal si hay una respuesta dismiss',()=>{
            spyOn(component.activemodal,'close').and.callThrough();
            component.confirmarNuevoPass();
            component.modalRef.dismiss();
            fixture.whenStable().then(()=>{
                expect(component.activemodal.close).toHaveBeenCalled();
            })
        })
    })
})