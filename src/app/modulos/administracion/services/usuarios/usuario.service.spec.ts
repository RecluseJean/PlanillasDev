import ConstantesDatosPrueba from '../../../../mocks/ConstantesMockito';
import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../../../models/usuario.model';
import { of } from 'rxjs/observable/of';

describe('UsuarioService', () => {
    var actualLsUsuario, actualRegUsu, actualActUsu, actualElimUsu, actualToken;
    const mockResponse = ConstantesDatosPrueba.ResponseWrapperCUSuario;
    const usuario = ConstantesDatosPrueba.usuarioPrueba1;
    const mockToken = ConstantesDatosPrueba.checkTokenUsuario;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                UsuarioService
            ]
        }).compileComponents();
    }));

    describe('Obtener ResponseWraper de ListarUsuarios con GET del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/api/usuario/listar';
                usuarioService.listarUsuarios()
                    .subscribe(
                        (res) => {
                            actualLsUsuario = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponse);
                expect(actualLsUsuario).toEqual(mockResponse);
                expect(req.request.method).toBe('GET');
            })
        );
    });

    describe('Obtener ResponseWraper de RegistrarUsuario con POST del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/api/usuario/registrar';
                usuarioService.registrarUsuario(usuario)
                    .subscribe(
                        (res) => {
                            actualRegUsu = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponse);
                expect(actualRegUsu).toEqual(mockResponse);
                expect(req.request.method).toBe('POST');
            })
        );
    })

    describe('Obtener ResponseWraper de ActualizarUsuario con PUT del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/api/usuario/modificar';
                usuarioService.actualizarUsuario(usuario)
                    .subscribe(
                        (res) => {
                            actualActUsu = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponse);
                expect(actualActUsu).toEqual(mockResponse);
                expect(req.request.method).toBe('PUT');
            })
        );
    })

    describe('Obtener ResponseWraper de EliminaUsuario con DELETE del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/api/usuario/1';
                usuarioService.eliminarUsuario(1)
                    .subscribe(
                        (res) => {
                            actualElimUsu = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponse);
                expect(actualElimUsu).toEqual(mockResponse);
                expect(req.request.method).toBe('DELETE');
            })
        );
    });

    describe('Obtener ResponseWraper de EliminaUsuario con DELETE del Back', () => {
        it('Objeto ResponseWraper esperado',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/api/usuario/1';
                usuarioService.eliminarUsuario(1)
                    .subscribe(
                        (res) => {
                            actualElimUsu = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockResponse);
                expect(actualElimUsu).toEqual(mockResponse);
                expect(req.request.method).toBe('DELETE');
            })
        );
    });

    describe('Prueba metodo checkToken', () => {
        it('Deberia retornar lo datos del usuario',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/oauth/check_token?token=AAA';
                usuarioService.checkToken('AAA')
                    .subscribe(
                        (res) => {
                            actualToken = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockToken);
                expect(actualToken).toEqual(mockToken);
                expect(req.request.method).toBe('GET');
            })
        );
    });

    describe('Prueba metodo login', () => {
        it('Deberia retornar el token',
            inject([HttpTestingController, UsuarioService], (httpMock: HttpTestingController, usuarioService: UsuarioService) => {
                const url = 'http://localhost:2000/oauth/token';

                var user = new Usuario();
                user.username = 'a',
                    user.password = 'a'
                usuarioService.login(user)
                    .subscribe(
                        (res) => {
                            actualToken = res;
                        }
                    );
                const req = httpMock.expectOne(url);
                req.flush(mockToken);
                expect(actualToken).toEqual(mockToken);
                expect(req.request.method).toBe('POST');
            })
        );
    });

    describe('Prueba metodo logout',()=>{
        it('Deberia limpiarse los datos de locaStorage',
        inject([UsuarioService], (usuarioService: UsuarioService) => {
            usuarioService.logout();
            expect(usuarioService.usuario).toBeNull();
            expect(usuarioService.token).toEqual('');
            expect(usuarioService.menu.length).toEqual(0);
            expect(localStorage.length).toEqual(0);
        })
    );
    })

    describe('Prueba metodo estaLogueado',()=>{
        it('Deberia enviar un observable de logueado si token no nulo',
        inject([UsuarioService], (usuarioService: UsuarioService) => {
            spyOn(usuarioService,'checkToken').and.returnValue(of({}))
            localStorage.setItem('token',JSON.stringify({'data':'token'}))
            var tokenRes:any = usuarioService.estaLogueado();
            expect(tokenRes).toBeDefined();
            expect(usuarioService.token).toBeDefined();
        }));

        it('Deberia enviar un observable de error si token es nulo',
        inject([UsuarioService], (usuarioService: UsuarioService) => {
            spyOn(usuarioService,'checkToken').and.returnValue(Observable.throw('Error'))
            localStorage.clear();
            var tokenRes:any = usuarioService.estaLogueado();
            expect(tokenRes.error).toEqual('Error')
            expect(usuarioService.token).toEqual('dsdaswer9889r832wjdwhwefshchjsvasgvdfdsgyaifuisadfassdahfsdajfsdkahfsjdfgdsfb');
        }));
    })
});
