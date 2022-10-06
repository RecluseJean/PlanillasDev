import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';


@Injectable()
export class SctrService {

  constructor( public http: HttpClient) { }

  listarSctr(){
    const url = URL_SERVICIOSBACK + 'sctr/listar';
    return this.http.get(url)
  }


  insertarSctr(data_sctr) {
    const url = URL_SERVICIOSBACK + 'sctr/insertar';
    return this.http.post(url, data_sctr)
  }

  actualizarSctr(data_sctr ){
    const url = URL_SERVICIOSBACK + 'sctr/actualizar';
    return this.http.post(url, data_sctr)
  }

  eliminarSctr(sctr){
    const url = URL_SERVICIOSBACK + 'sctr/' + sctr.idSctr;
    return this.http.delete(url,sctr)

  }

}