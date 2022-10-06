import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class TiposPermisoService {
  constructor(
    public http: HttpClient
  ) { }

  listarPermisosPorEmpresa(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'tipoPermiso/listarXEmpresa', empresa)
  }

  registrarPermiso(dto) {
    return this.http.post(URL_SERVICIOSBACK + 'tipoPermiso/registrar', dto)
  }

  actualizarPermiso(dto) {
    return this.http.put(URL_SERVICIOSBACK + 'tipoPermiso/modificar', dto);
  }

  eliminarPermiso(id) {
    return this.http.delete(URL_SERVICIOSBACK + 'tipoPermiso/' + id);
  }
}
