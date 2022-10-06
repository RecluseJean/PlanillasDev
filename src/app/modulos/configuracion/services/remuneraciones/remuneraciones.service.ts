import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class RemuneracionesService {

  constructor(public http: HttpClient) { }

  listar(empresa){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/listar",empresa);
  }

  listarInac(empresa){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/listarInac",empresa);
  }

  registrar(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/registrar",empresaDTO)
  }

  modificar(remuneracion){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/modificar",remuneracion)
  }

  darBaja(remuneracion){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/darBaja",remuneracion)
  }

  activar(remuneracion){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/activar",remuneracion)
  }

}
