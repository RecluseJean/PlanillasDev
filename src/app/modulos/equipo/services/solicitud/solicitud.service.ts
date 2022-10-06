import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';


@Injectable()
export class SolicitudService {

  constructor(public http: HttpClient) { }
  listarSolicitudxEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorEmpresa',empresa)
  }
  listarSolicitudxSupervisor(usuario) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/listarPorSupervisor',usuario)
  }
  cancelarSolicitud(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cancelarSolicitud',solicitudDto)    
  }
  eliminarSolicitud(solicitud){
    const url = URL_SERVICIOSBACK + 'solicitud/' + solicitud.iidSolicitud;
    return this.http.delete(url,solicitud)
  }
  cambiarEstado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstado',solicitudDto)    
  }
  cambiarEstadoRevision(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoRevision',solicitudDto)    
  }
  cambiarEstadoAprobado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoAprobar',solicitudDto)    
  }
  cambiarEstadoRechazado(solicitudDto) {
    return this.http.put(URL_SERVICIOSBACK + 'solicitud/cambiarEstadoRechazar',solicitudDto)    
  }

  listarPuestoPorOrden(proyeccionPuesto) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuestoPorOrden',proyeccionPuesto)
  }

  registrarSolicitud(solicitudDto) {
    return this.http.post(URL_SERVICIOSBACK + 'solicitud/registrar',solicitudDto)    
  }

  listarPuestoAreaEmp(empresa) {
    return this.http.post (URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuesto', empresa);
  }

  insertarEquipo(equipo){
    return this.http.post(URL_SERVICIOSBACK + 'equipo/registrar',equipo)
  }
  
}
