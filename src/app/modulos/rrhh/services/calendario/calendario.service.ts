import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(public http: HttpClient) { }

  listarEventoPorEmp(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'evento/listarPorEmpresa', empresa);
  }

  listarAreaDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa';
    return this.http.post(url, empresa)
  }

  nulearHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/nullHorario', horario);
  }

  eliminarHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/eliminar', horario);
  }

  registrarEvento(evDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'evento/registrar', evDTO);
  }

  actualizarHorario(horario) {
    return this.http.put(URL_SERVICIOSBACK + 'horario/actualizar', horario);
  }



}
