import { of } from "rxjs";
of(this.purposes);

export class PlanillaServiceStub{
  listarTrabajador(empresa){
    return of();
  }

  generarPlanilla(planilla_final){
    return of();
  }

  obtenerTipoTardanza(empresa){
    return of();
  }

  obtenerTipoRango(empresa){
    return of();
  }

  encontrarPlanilla(planilla_final){
    return of();
  }

  listarBoletas(trabajador){
    return of();
  }

  eliminarPlanilla(planilla){
    return of();
  }

  reportes(obj) {
    return of();
  }

  listarTrabajadorPorComprobante(empresa,tipoComp){
    return of();
  }

  subirArchivo(archivo:File, idTtrab:number){
    return of();
  }

  listarUlt(trab){
    return of();
  }

  eliminarRHE(idtrab){
    return of();
  }

  registrarRHE(archivo:File, idTrab,idpdoAno,idpdoMes){
    return of();
  }

  listarRHEs(planDTO){
    return of();
  }

  descargarRHE(rhe){
    return of();
  }

  registarSolicitud(adeSueDTO){
    return of();
  }

  listarAdeSue(trabajador){
    return of();
  }

  listarCuotas(adeSue){
    return of();
  }

  listarDeuda(trabajador){
    return of();
  }

  subirArchivoAdelantoSueldo(archivo:File, idAdeSue:number){
    return of();
  }

  listarCuentaCargo(empresa){
    return of();
  }

  generarTxtGeneral(cuentaCargoDTO){
    return of();
  }

  descargarTxtGeneral(txt){
    return of();
  }

  generarTxtPersonal(cuentaCargoDTO){
    return of();
  }
}
