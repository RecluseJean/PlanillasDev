import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';


@Injectable()
export class EpsService {

  constructor( public http: HttpClient) { }

  listarEps(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'eps/listarXEmpresa',empresa)
  }


  insertarEps(data_eps) {
    const url = URL_SERVICIOSBACK + 'eps/insertar';
    return this.http.post(url, data_eps)
  }

  actualizarEps(data_eps ){
    const url = URL_SERVICIOSBACK + 'eps/actualizar';
    return this.http.post(url, data_eps)
  }

  eliminarEps(eps){
    const url = URL_SERVICIOSBACK + 'eps/' + eps.idEps;
    return this.http.delete(url)
  }

}