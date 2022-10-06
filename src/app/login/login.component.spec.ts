import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { InicioComponent } from '../shared/Inicio/inicio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsuarioService } from '../modulos/administracion/services/usuarios/usuario.service';
import { UsuarioServiceStub } from '../mocks/services/usuario.service.stub';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let error_bad_credentials= {
        'error':{
            'error_description':'Bad credentials'
        }
    }
    let error_user_disabled= {
        'error':{
            'error_description':'User is disabled'
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                InicioComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes(
                    [
                        { path: 'login', component: LoginComponent },
                        { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio' } }
                    ]),
                HttpClientTestingModule,
                FormsModule
            ],
            providers: [
                {provide: UsuarioService, useClass: UsuarioServiceStub}
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        router.initialNavigation();
        component.router = router;
        fixture.detectChanges();
    }))

    describe('Creacion del component', () => {
        it('Deberia crearse el componente Breadcrumbs', async(() => {
            const fixture = TestBed.createComponent(LoginComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }))
    })

    describe('Prueba Metodo ngOnInit',()=>{
        it('Deberia redirigir al inicio si esta logueado',()=>{
            localStorage.setItem('token',JSON.stringify({'data':'asdasd'}));
            spyOn(router,'navigate');
            component.ngOnInit();
            expect(component.token).toBeDefined();
            expect(router.navigate).toHaveBeenCalledWith(['/inicio'])
        })
        afterEach(()=>{
            localStorage.clear();
        })
    })

    describe('Prueba metodo login',()=>{
        it('Deberia llamarse a metodo desde el template',()=>{
            spyOn(component,'login').and.callFake(()=>{})
            const button = fixture.debugElement.nativeElement.querySelector('#entrar');
            button.click();
            expect(component.login).toHaveBeenCalled();
        })

        it('Deberia mostrar una alerta de error si las credenciales son incorrectas',()=>{
            spyOn(component._usuarioService,'login').and.returnValue(Observable.throw(error_bad_credentials))
            component.login();
            expect(component.error).toEqual('¡El nombre de usuario o la contraseña son incorrectos!');
        })

        it('Deberia mostrar una alerta de error si el usuario se ha deshabilitado',()=>{
            spyOn(component._usuarioService,'login').and.returnValue(Observable.throw(error_user_disabled))
            component.login();
            expect(component.error).toEqual('¡El usuario ingresado esta deshabilitado¡');
        })

        it('Deberia mostrar una alerta de error si ocurrio un error en el servior',()=>{
            spyOn(component._usuarioService,'login').and.returnValue(Observable.throw({'error':'Error en el servidor'}))
            component.login();
            expect(component.error).toEqual('Error en el servidor');
        })
    })
});
