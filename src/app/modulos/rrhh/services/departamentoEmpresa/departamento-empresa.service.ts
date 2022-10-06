import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class DepartamentoEmpresaService {

  constructor(public http: HttpClient) { }

  listarDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'departamentoEmpresa/listarDepartamentoXEmpresa';
    return this.http.post(url, empresa)
  }

  insertarDepEmp(data_departamentoEmpresa) {
    const url = URL_SERVICIOSBACK + 'departamentoEmpresa/insertar';
    return this.http.post(url, data_departamentoEmpresa)
  }

  actualizarDepEmp(data_departamentoEmpresa) {
    const url = URL_SERVICIOSBACK + 'departamentoEmpresa/actualizarDepartamentoXEmpresa';
    return this.http.post(url, data_departamentoEmpresa)
  }

  eliminarDepEmp(departamentoEmpresa) {
    const url = URL_SERVICIOSBACK + 'departamentoEmpresa/' + departamentoEmpresa.iidDepartamentoEmpresa;
    return this.http.delete(url, departamentoEmpresa)
  }
  
}
