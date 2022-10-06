import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class CentroCostosService {

  constructor( public http: HttpClient) { }

  listarCentroCostosXEmpresa(empresa) {
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'centroCosto/porEmpresa',empresa);
    return res;

  }
  insertarCentroCostos(data_centro_costos){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'centroCosto/insertar',data_centro_costos);
    return res;
  }

  actualizarCentroCostos(data_centro_costos) {
    const url = URL_SERVICIOSBACK + 'centroCosto/actualizar';
    return this.http.post(url, data_centro_costos)
  }

  eliminarCentroCostos(data_centro_costos){
    const url = URL_SERVICIOSBACK + 'centroCosto/' + data_centro_costos.idCentroCosto;
    return this.http.delete(url,data_centro_costos)
  }

  nulearCentroCostos(centroCostos){
    return this.http.post(URL_SERVICIOSBACK + 'centroCosto/nullCentroCosto',centroCostos);
  }
}
