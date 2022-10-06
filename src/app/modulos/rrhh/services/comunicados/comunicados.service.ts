import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {

  constructor(public http: HttpClient) { }

  listarHorariosPorEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/listarXempresa', empresa);
  }

  registrarHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/insertar', horario);
  }

  actualizarHorario(horario) {
    return this.http.put(URL_SERVICIOSBACK + 'horario/actualizar', horario);
  }

  eliminarHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/eliminar', horario);
  }

  nulearHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/nullHorario', horario);
  }

  listarAreaDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa';
    return this.http.post(url, empresa)
  }

  listarTrabajadorPorComprobanteYSituacion(idEmpresa: number, tipoComprobate: number, idSituacion: number){
    return this.http.get(URL_SERVICIOSBACK + 'trabajador/listarPor/'+idEmpresa+"/"+tipoComprobate+"/"+idSituacion);
  }

  listarDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'departamentoEmpresa/listarDepartamentoXEmpresa';
    return this.http.post(url, empresa)
  }

  registrarActividad(acDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'actividades/registrar', acDTO);
  }

  listarActividadesPorEmp(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'actividades/listarPorEmpresa', empresa);
  }

  registrarNota(noDTO) {debugger
    return this.http.post(URL_SERVICIOSBACK + 'notas/registrar', noDTO);
  }

  listarNotasPorEmp(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'notas/listarPorEmpresa', empresa);
  }

  
}
