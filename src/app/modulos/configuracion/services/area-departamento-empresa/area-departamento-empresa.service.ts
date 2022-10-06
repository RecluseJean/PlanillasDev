import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { AreaDepartamentoEmpresa } from '../../../../models/AreaDepartamentoEmpresa';

@Injectable()
export class AreaDepartamentoEmpresaService {

  constructor(public http: HttpClient) { }

  listarAreaDepEmp(empresa) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa';
    return this.http.post(url, empresa)
  }


  insertarAreaDepEmp(departamentoEmpresaDTO) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/insertar';
    return this.http.post(url, departamentoEmpresaDTO)
  }

  actualizarAreaDepEmp(departamentoEmpresaDTO) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/actualizarAreaDepartamentoEmpresa';
    return this.http.post(url, departamentoEmpresaDTO)
  }

  eliminarAreaDepEmp(areaDepartamentoEmpresa : AreaDepartamentoEmpresa) {
    const url = URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/' + areaDepartamentoEmpresa.iidAreaDepartamentoEmpresa;
    return this.http.delete(url)
  }
}
