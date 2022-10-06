import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class BuzonSugerenciaService {

  constructor(public http: HttpClient) { }

  registrarSugerencia(suDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'sugerencias/registrar', suDTO);
  }

  listarAreaDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa';
    return this.http.post(url, empresa)
  }

  listarSugerenciasEmp(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'sugerencias/listarPorEmpresa', empresa);
  }


//A modificar

  actualizarHorario(horario) {
    return this.http.put(URL_SERVICIOSBACK + 'horario/actualizar', horario);
  }

  eliminarHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/eliminar', horario);
  }

  nulearHorario(horario) {
    return this.http.post(URL_SERVICIOSBACK + 'horario/nullHorario', horario);
  }



}
