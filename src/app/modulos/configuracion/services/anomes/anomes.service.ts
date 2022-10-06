import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class AnoMesService {
  constructor(public http: HttpClient) {
  }

  registrarAno(ano){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'anomes/registrar',ano);
    return res;
  }

  // actualizarAno(ano){
  //   var res:any;
  //   res=this.http.post(URL_SERVICIOSBACK + 'anomes/modificarAno',ano);
  //   return res;
  // }

  listarMeses(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'anomes/listarMeses');
    return res;
  }

  actualizarMes(mes){
    return this.http.put(URL_SERVICIOSBACK + 'anomes/modificarMes',mes);
  }

}
