import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { ProyeccionPuesto } from '../../../../models/ProyeccionPuesto';

@Injectable()
export class OrganigramaService {

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

  listarConceptoPlanilla(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'conceptoPlanilla/listar' , empresa);
  }

  listarCuentaContable(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'cuentaContable/listar' , empresa);
  }

  listarConceptoPlame(){
    return this.http.get(URL_SERVICIOSBACK + 'conceptoPlame/listar')
  }

  generarReporteCueCon(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'generarExcel/generarReporteCtaCont' , empresaDTO);
  }

  descargarReporte(reporte:string){
    return this.http.get(URL_SERVICIOSBACK+"generarExcel/descargar/"+reporte, {
      responseType: "arraybuffer"
      });
  }



}
