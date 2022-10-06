import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { LoginGuardGuard } from './login-guard.guard';
import { of } from 'rxjs/observable/of';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('LoginGuardTest', () => {
    
    let router: Router;
    let loginGuard: LoginGuardGuard;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent, data: { titulo: 'Ingresar' }}]),
                FormsModule
            ],
            providers: [
               UsuarioService,
            ],
            schemas:[
                NO_ERRORS_SCHEMA,
            ],
            declarations: [
                AppComponent,
                LoginComponent
            ]
        }).compileComponents();
        router = TestBed.get(Router);
        router.initialNavigation();
    }));
    
    it('Deberia dejar pasar a la ruta si tiene credenciales correctas',
    inject([UsuarioService], (usuarioService: UsuarioService)=>{
        loginGuard = new LoginGuardGuard(usuarioService,router);
        spyOn(usuarioService,'estaLogueado').and.returnValue(of({'data':true}))
        loginGuard.canActivate();
        expect(loginGuard.estadologin).toBeTruthy();    
    }))

    it('Deberia enviar al login si no tiene credenciales correctas',
    inject([UsuarioService], ( usuarioService: UsuarioService)=>{
        loginGuard = new LoginGuardGuard(usuarioService,router);
        spyOn(usuarioService,'estaLogueado').and.returnValue(Observable.throw({'status':401,'error':'Bad user'}))
        spyOn(router,'navigate');
        loginGuard.canActivate();
        expect(loginGuard.estadologin).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }))

})