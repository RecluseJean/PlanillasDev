import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ConceptoCuentaService {

  constructor(public http: HttpClient) { }

  listarConceptoPlanilla(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'conceptoPlanilla/listar' , empresa);
  }

  generarReporteCueCon(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'generarExcel/generarReporteCtaCont' , empresaDTO);
  }

  descargarReporte(reporte:string){
    return this.http.get(URL_SERVICIOSBACK+"generarExcel/descargar/"+reporte, {
      responseType: "arraybuffer"
      });
  }

  registrarConceptoPlanilla(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'conceptoPlanilla/insertar' , empresaDTO);
  }

  actualizarConceptoPlanilla(conceptoPlanilla){
    return this.http.put(URL_SERVICIOSBACK + 'conceptoPlanilla/actualizar' , conceptoPlanilla);
  }

  eliminarConceptoPlanilla(conceptoPlanilla){
    return this.http.delete(URL_SERVICIOSBACK + 'conceptoPlanilla/' + conceptoPlanilla.iidConceptoPlanilla);
  }

  listarCuentaContable(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'cuentaContable/listar' , empresa);
  }

  registrarCuentaContable(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'cuentaContable/insertar' , empresaDTO);
  }

  actualizarCuentaContable(cuentaContable){
    return this.http.put(URL_SERVICIOSBACK + 'cuentaContable/actualizar' , cuentaContable);
  }

  eliminarCuentaContable(cuentaContable){
    return this.http.delete(URL_SERVICIOSBACK + 'cuentaContable/' + cuentaContable.iidCuentaContable);
  }

  listarConceptoPlame(){
    return this.http.get(URL_SERVICIOSBACK + 'conceptoPlame/listar')
  }

  listarVistaPlame(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'vistaPlame/listarPorEmpresa' , empresa);
  }

  guardarConfigVPlame(empresaDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'vistaPlame/configVistaPlame', empresaDTO);
  }

}
