import { Injectable} from '@angular/core';
import { URL_SERVICIOSBACK } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HeaderService {

  constructor(
    public http: HttpClient
  ) { }


  listarEmpresa(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'empresa/listar')
    return res;
  }

  listarAno(empresa){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'anomes/listarPorEmpresa',empresa)
    return res;
  }

  listarMeses(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'anomes/listarMeses')
    return res;
  }

}
