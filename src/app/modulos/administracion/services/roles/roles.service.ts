import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class RolService{
    constructor(
        public http: HttpClient
    ){ }

    listarPerfiles(){
        return this.http.get(URL_SERVICIOSBACK+'modulo/listarPerfiles')
    }

    listarPorPerfiles(perfil) {
        return this.http.post(URL_SERVICIOSBACK + 'usuario/listarPorEmpresa', perfil);
      }

    listarPorPerfilesOrden(perfil) {
        return this.http.post(URL_SERVICIOSBACK + 'modulo/listarPorPerfiles', perfil);
    }

}