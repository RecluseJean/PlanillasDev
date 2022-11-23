import { Injectable } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOSBACK, URL_BASICO } from '../../../../config/config';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Constantes from '../../../../models/Constantes';

@Injectable()
export class UsuarioService {
  usuario: Usuario = new Usuario();
  token: string;
  expire: number;
  menu: any[] = [];
  verifica: boolean = false;
  usuarioRetornar = new Usuario();
  result: any;
  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  checkToken(token: string): Observable<any> {
    let url = URL_BASICO + 'oauth/check_token' + '?token=' + token;
    return this.http.get(url);
  }

  login(usuario: Usuario) {
    let url = URL_BASICO + 'oauth/token';
    const credenciales = btoa('planillas123:planillas');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post(url, params.toString(), { headers: httpHeaders })
  }

  estaLogueado(): Observable<any> {
    if (JSON.parse(localStorage.getItem('InfoToken')) != null) {
      this.token = JSON.parse(localStorage.getItem('InfoToken')).access_token;
    }
    if (this.token == null) {
      this.token = "dsdaswer9889r832wjdwhwefshchjsvasgvdfdsgyaifuisadfassdahfsdajfsdkahfsjdfgdsfb"
    }
    return this.checkToken(this.token);
  }

  subirFoto(archivo: File, id) {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(URL_SERVICIOSBACK + "usuario/uploadImage", formData);
  }

  refreshToken() {
    this.token = JSON.parse(localStorage.getItem('InfoToken')).refresh_token;
    let url = URL_BASICO + 'oauth/token';
    const credenciales = btoa('planillas123:planillas');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', this.token);
    return this.http.post(url, params.toString(), { headers: httpHeaders })

  }

  logout() {
    this.usuario = null;
    this.menu = [];
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  listarUsuarios() {
    return this.http.get(URL_SERVICIOSBACK + 'usuario/listar');
  }

  listarUsuariosPorEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'usuario/listarPorEmpresa', empresa);
  }

  registrarUsuario(usuario) {
    return this.http.post(URL_SERVICIOSBACK + 'usuario/registrar', usuario);
  }

  actualizarUsuario(usuario) {
    return this.http.put(URL_SERVICIOSBACK + 'usuario/modificar', usuario);
  }

  eliminarUsuario(id) {
    return this.http.delete(URL_SERVICIOSBACK + 'usuario/' + id);
  }

  asignarHuellero(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'huellaDigital/asignarHuellero', empresa);
  }

  cargarPaginasPerfil(perfil): Observable<any> {
    let url = URL_SERVICIOSBACK + 'modulo/listar';
    catchError((err: HttpErrorResponse) => {
      return Observable.throw(err);
    });
    return this.http.post(url, perfil)
  }

  registrarPerfil(moduloDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'modulo/registrar/perfil', moduloDTO);
  }

  listarPerfil() {
    return this.http.get(URL_SERVICIOSBACK + 'modulo/listarPerfiles');
  }

  listarPagina() {
    return this.http.get(URL_SERVICIOSBACK + 'modulo/listarPaginas');
  }

  guardarGestion(moduloDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'modulo/gestionPagina', moduloDTO);
  }

  descargarTodo() {
    return this.http.get(URL_SERVICIOSBACK + "utilitario/descargar", {
      responseType: "arraybuffer"
    });
  }

  reestablecerContraseña(usuario) {
    return this.http.put(URL_SERVICIOSBACK + 'usuario/reestablecerContrasena', usuario);
  }

  registrarSolicitudRecuperarPass(email: string) {
    return this.http.post(URL_BASICO + 'solicitudPassword/registrar', {"email":email, "url":window.location.href});
  }

  validarSolicitudRecuperarPass(usuario) {
    return this.http.post(URL_BASICO + 'solicitudPassword/validarSolicitud', usuario);
  }

  CambiarPasswordSolicitudRecuPass(usuario) {
    return this.http.post(URL_BASICO + 'solicitudPassword/cambiarPassword', usuario);
  }

  marcarAsistencia(asistencia) {
    return this.http.post(URL_SERVICIOSBACK + 'asistencia/marcarAsistencia', asistencia);
  }

  marcarAlmuerzo(asistencia) {debugger
    return this.http.post(URL_SERVICIOSBACK + 'asistencia/marcarAlmuerzo', asistencia);
  }

}
