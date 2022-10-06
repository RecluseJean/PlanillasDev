import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
//import { Postulante } from 'src/app/models/postulante';

@Injectable()
export class PostulanteService {

  constructor(public http: HttpClient) {
  }

  listarPostulante(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/listarGerencial',empresa)
  }

  listarTipoDoc(){
    return this.http.get(URL_SERVICIOSBACK + 'tipoDoc/listar')
  }

  listarNivelEdu(){
    return this.http.get(URL_SERVICIOSBACK + 'nivelEdu/listar')
  }

  listarOcupacion(){
    return this.http.get(URL_SERVICIOSBACK + 'ocupacion/listar')
  }

  insertarPostulante(postulante){
    return this.http.post(URL_SERVICIOSBACK + 'postulante/registrar',postulante)
  }


  actualizaPostulante(trabajador){
    var res:any;
    res=this.http.put(URL_SERVICIOSBACK + 'trabajador/modificar',trabajador);
    return res;
  }

  anadirPostulanteReclu(postulante){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'postulante/añadirPostulanteReclu',postulante);
    return res;
  }

  buscarPostulante(postulante){
    return this.http.post(URL_SERVICIOSBACK + 'postulante/buscarPostulanteXDNI',postulante)
  }

  listarPostulaciones(postulante){
    return this.http.post(URL_SERVICIOSBACK + 'postulante/listarPostulaciones',postulante)
  }

  existeNroDocumento(nrodoc:string){
    return this.http.post(URL_SERVICIOSBACK+"postulante/existeNro_Documento", nrodoc)
  }
}
