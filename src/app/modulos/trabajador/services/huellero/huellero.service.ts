import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HuelleroService {

  URL_BACKHUELLERO: String = "http://";
  constructor(
    public http: HttpClient
  ) { }

  buscarHuellero(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'huellaDigital/buscarHuellero', empresa)
  }

  iniciarHullero(ipPrivada: string) {
    return this.http.get('http://'+ ipPrivada+':3000/huella/open')
  }
}
