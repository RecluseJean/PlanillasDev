import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { URL_SERVICIOSBACK } from '../../config/config';
import { HttpClient,HttpRequest,HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../../models/usuario.model';
@Injectable()

export class SidebarService {

  public usuario:Usuario;
  public menu: any[] = [];
  public nameModulo:string="";
  public notificacion = new EventEmitter<any>();
  constructor(
    public _usuarioService: UsuarioService,
    public http: HttpClient
  ) { }


  cargarPaginasPerfil(perfil):Observable<any> {
    let url = URL_SERVICIOSBACK + 'modulo/listar';
    catchError( (err:HttpErrorResponse) => {
      return Observable.throw( err );
    });
    return this.http.post(url,perfil)
                
  }

/*
  logout() {
    alert('logout')
    let fd = new FormData();

    let url = URL_SERVICIOSBACK + '/oauth/revoke-token';
    return this.http.post( url ,fd)
                .map( (resp: any) => {
                 this._usuarioService.logout();
                  return true;
               });
  }*/

}
