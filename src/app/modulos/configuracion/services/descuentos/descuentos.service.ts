import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class DescuentosService {

  constructor(
    private http: HttpClient
  ) { }

  listarDsct(empresa){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/listar",empresa)
  }

  listarDsctInac(empresa){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/listarInac",empresa)
  }

  registrarDsct(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/registrar",empresaDTO)
  }

  modificarDsct(dsct){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/modificar",dsct)
  }

  darBajaDsct(dsct){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/darBaja", dsct)
  }

  activarDsct(dsct){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/activar", dsct)
  }

}
