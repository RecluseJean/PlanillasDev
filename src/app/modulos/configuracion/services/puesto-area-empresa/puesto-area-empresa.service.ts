import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { ProyeccionPuesto } from '../../../../models/ProyeccionPuesto';

@Injectable()
export class PuestoAreaEmpresaService {

  constructor(public http: HttpClient) { }

  listarPuestoAreaEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuesto';
    return this.http.post(url, empresa)
  }

  insertarPuestoAreaEmp(puestoDTO) {
    const url = URL_SERVICIOSBACK + 'puestoAreaEmpresa/insertar';
    return this.http.post(url, puestoDTO)
  }

  actualizarPuestoAreaEmp(puestoDTO) {
    const url = URL_SERVICIOSBACK + 'puestoAreaEmpresa/actualizarPuestoAreaEmpresa';
    return this.http.post(url, puestoDTO)
  }

  eliminarProyeccion(proyeccion) {
    const url = URL_SERVICIOSBACK + 'puestoAreaEmpresa/' + proyeccion.iidProyeccion;
    return this.http.delete(url)
  }

  listarProyeccionPuesto(empresa) {
    const url = URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarProyeccionPuesto';
    return this.http.post(url, empresa)
  }

}
