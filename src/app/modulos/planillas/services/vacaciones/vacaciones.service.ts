import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class VacacionesService {

  constructor(
    public http: HttpClient
  ) { }

  listarPorTrabajador(trab) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/listarPorTrabajador', trab);
  }

  listarVacasTomadPorTrabajador(idTrab) {
    return this.http.get(URL_SERVICIOSBACK + 'vacaciones/listarVacacionesTomadasPorTrabajador/'+idTrab);
  }

  calcularFechFin(calc) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/calcFin', calc);
  }

  registrarVacaTomada(vt) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/registrarVT', vt);
  }

  registrarVacaVendida(vv) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/registrarVV', vv);
  }

  registrarVacaAdelantada(va,dias) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/registrarVA/'+dias, va);
  }

  consultarVacionesTrabajador(trabajador) {
    return this.http.post(URL_SERVICIOSBACK + 'vacaciones/consultaVacaciones', trabajador);
  }
}
