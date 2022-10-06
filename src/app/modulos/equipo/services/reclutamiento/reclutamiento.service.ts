import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class ReclutamientoService {

  constructor(public http: HttpClient) { }
  listarReclutamientoxEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'reclutamiento/listarPorEmpresa',empresa)
  }

  subirArchivo(archivo:File, idPost:number){
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK+"reclutamiento/adjuntarCV/"+idPost,formData);
  }

  enviarCorreo(postulante){
    return this.http.post(URL_SERVICIOSBACK + 'reclutamiento/enviarCorreo',postulante)
  }

  anadirListaNegraPostulante(postulante) {
    return this.http.put(URL_SERVICIOSBACK + 'reclutamiento/añadirListaNegra',postulante)    
  }
}
