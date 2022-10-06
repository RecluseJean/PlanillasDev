import { NuevoUsuarioConfirmarComponent } from './nuevo-usuario-confirmar.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioServiceStub } from '../../../../../../mocks/services/usuario.service.stub';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import ConstantesDatosPrueba from '../../../../../../mocks/ConstantesMockito';

describe('NuevoUsuarioConfirmarComponent', () => {
    let component: NuevoUsuarioConfirmarComponent;
    let fixture: ComponentFixture<NuevoUsuarioConfirmarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NuevoUsuarioConfirmarComponent
            ],
            imports: [
                RouterTestingModule,
                NgbModule.forRoot()
            ],
            providers: [
                { provide: UsuarioService, useClass: UsuarioServiceStub },
                NgbActiveModal,
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NuevoUsuarioConfirmarComponent);
        component = fixture.componentInstance;
        component.input_usuario_final = { "usuario": ConstantesDatosPrueba.usuarioPrueba1 };
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente NuevoUsuarioConfirmar', async(() => {
            const fixture = TestBed.createComponent(NuevoUsuarioConfirmarComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    });

    describe('Prueba metodo crud', () => {
        it('Deberia llamar al metodo desde el template', () => {
            spyOn(component, 'crud').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#crud');
            button.click();
            expect(component.crud).toHaveBeenCalled();
        })

        it('Deberia llamar a actualizar usuario si la accion es U', () => {
            spyOn(component, 'actualizarUsuario').and.callThrough();
            component.obj_usuario.usuario.accion = 'U';
            component.crud();
            expect(component.actualizarUsuario).toHaveBeenCalled();
        })

        it('Deberia llamar a registrar usuario si la accion es R', () => {
            spyOn(component, 'registrarUsuario').and.callThrough();
            component.obj_usuario.usuario.accion = 'R';
            component.crud();
            expect(component.registrarUsuario).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo close', () => {
        it('Deberia llamarse desde el template', () => {
            spyOn(component, 'close').and.callThrough();
            const button = fixture.debugElement.nativeElement.querySelector('#cerrar');
            button.click();
            expect(component.close).toHaveBeenCalled();
        })

        it('Deberia cerrarse el modal', () => {
            spyOn(component.activemodal, 'close').and.callThrough();
            component.close();
            expect(component.activemodal.close).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo registrarUsuario', () => {
        it('Deberia mostrar una alerta de usuario creado correctamente si estado es 1', () => {
            spyOn(component, 'refrescar').and.callThrough();
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.obj_usuario = 1;
            component.registrarUsuario();
            expect(component.estado).toEqual(1);
            expect(component.refrescar).toHaveBeenCalled();
        })

        it('Deberia mostrar una alerta de error si estado no es 1', () => {
            spyOn(component, 'refrescar').and.callThrough();
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.obj_usuario = 0;
            component.registrarUsuario();
            expect(component.estado).toEqual(0);
            expect(component.refrescar).toHaveBeenCalled();
        })
    })

    describe('Prueba metodo actuaizarUsuario', () => {
        it('Deberia mostrar una alerta de usuario actualizado correctamente si estado es 1', () => {
            spyOn(component, 'refrescar').and.callThrough();
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.obj_usuario = 1;
            component.actualizarUsuario();
            expect(component.estado).toEqual(1);
            expect(component.refrescar).toHaveBeenCalled();
        })

        it('Deberia mostrar una alerta de error si estado no es 1', () => {
            spyOn(component, 'refrescar').and.callThrough();
            spyOn(component.activemodal, 'dismiss').and.callThrough();
            component.obj_usuario = 0;
            component.actualizarUsuario();
            expect(component.estado).toEqual(0);
            expect(component.refrescar).toHaveBeenCalled();
        })
    })
});