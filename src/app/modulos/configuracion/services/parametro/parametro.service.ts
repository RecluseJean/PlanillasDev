import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class ParametroService {

  constructor(public http: HttpClient) {
  }

  listarParametrosEmpresa(empresa) { 
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'parametro/porempresa',empresa);
    return res;
  }

  actualizarParametro(data_parametro) { 
    const url = URL_SERVICIOSBACK + 'parametro/actualizar';
    return this.http.post(url, data_parametro)
  }
}
