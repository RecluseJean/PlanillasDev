import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class HorarioService {

  constructor(
    public http: HttpClient
  ) { }

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
}
