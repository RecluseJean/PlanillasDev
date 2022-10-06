import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class AfpService {

  constructor(public http: HttpClient) {
  }

  registrarAfp(afp){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'afp/registrar',afp);
    return res;
  }

  eliminarAfp(afp){
    var res:any;
    res=this.http.delete(URL_SERVICIOSBACK + 'afp/'+afp.idAfp);
    return res;
  }

  actualizarAfp(afp){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'afp/modificar',afp);
    return res;
  }

  listarAfp(empresa){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'afp/listarXEmpresa',empresa);
    return res;
  }
}
