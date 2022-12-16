import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { DerechoHabiente } from '../../../../models/Derecho-Habiente';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  contrato: any;

  constructor(public http: HttpClient) {
  }

  listarTrabajador(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/listarGerencial',empresa)
  }

  listarTipoDoc(){
    return this.http.get(URL_SERVICIOSBACK + 'tipoDoc/listar')
  }

  listarPais(){
    return this.http.get(URL_SERVICIOSBACK + 'pais/listar')
  }

  listarEstadoCivil(){
    return this.http.get(URL_SERVICIOSBACK + 'estadoCivil/listar')
  }

  listarDepartamento(){
    return this.http.get(URL_SERVICIOSBACK + 'departamento/listar')
  }

  listarProvincia(departamento){
    return this.http.post(URL_SERVICIOSBACK + 'provincia/porDepartamento',departamento)
  }

  listarDistrito(provincia){
    return this.http.post(URL_SERVICIOSBACK + 'distrito/porProvincia',provincia)
  }

  listarTipoZona(){
    return this.http.get(URL_SERVICIOSBACK + 'tipoZona/listar')
  }

  listarNivelEdu(){
    return this.http.get(URL_SERVICIOSBACK + 'nivelEdu/listar')
  }

  listarOcupacion(){
    return this.http.get(URL_SERVICIOSBACK + 'ocupacion/listar')
  }

  listarAfp(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'afp/listarXEmpresa',empresa)
  }

  listarEps(){
    return this.http.get(URL_SERVICIOSBACK + 'eps/listar')
  }

  listarRegSalud(){
    return this.http.get(URL_SERVICIOSBACK + 'regSalud/listar')
  }

  listarSituacion(){
    return this.http.get(URL_SERVICIOSBACK + 'situacion/listar')
  }

  listarRegLaboral(){
    return this.http.get(URL_SERVICIOSBACK + 'regimenLaboral/listar')
  }

  listarTipoContrato(){
    return this.http.get(URL_SERVICIOSBACK + 'tipoContrato/listar')
  }

  listarCentroCosto(empresa){
    return this.http.post(URL_SERVICIOSBACK + 'centroCosto/porEmpresa',empresa)
  }

  listarAreaDepEmp(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'areaDepartamentoEmpresa/listarAreaDepartamentoEmpresa',empresa)
  }

  listarPuesto(empresa) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuesto',empresa)
  }

  listarPuestoXArea(areaDepEmp) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoAreaEmpresa/listarPuestoXArea',areaDepEmp)
  }

  listarTipoPago(){
    return this.http.get(URL_SERVICIOSBACK + 'tipoPago/listar')
  }

  listarBanco(){
    return this.http.get(URL_SERVICIOSBACK + 'banco/listar')
  }

  listarSctr(){
    return this.http.get(URL_SERVICIOSBACK + 'sctr/listar')
  }

  insertarTrabajador(trabajador){
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/registrar',trabajador)
  }

  listarTrabajadorPorComprobante(empresa,tipoComp){
    return this.http.post(URL_SERVICIOSBACK + 'trabajador/porEmpresayTipoComprobante/'+tipoComp,empresa);
  }

  listarTrabajadorPorComprobanteYSituacion(idEmpresa: number, tipoComprobate: number, idSituacion: number){
    return this.http.get(URL_SERVICIOSBACK + 'trabajador/listarPor/'+idEmpresa+"/"+tipoComprobate+"/"+idSituacion);
  }

  actualizarTrabajador(trabajador){
    var res:any;
    res=this.http.put(URL_SERVICIOSBACK + 'trabajador/modificar',trabajador);
    return res;
  }

  eliminarTrabajador(idTrabajador){
    return this.http.delete(URL_SERVICIOSBACK + 'trabajador/eliminarTrabajador/'+idTrabajador)
  }

  generarContrato(contrato){
    return this.http.post(URL_SERVICIOSBACK + "contrato/generarContrato",contrato);
  }

  descargarContrato(contrato){
    return this.http.get(URL_SERVICIOSBACK+"contrato/descargarWord/"+contrato, {
      responseType: "arraybuffer"
      });
  }

  subirContrato(contrato:File, idTrab:number){
    let formData = new FormData();
    formData.append("file", contrato);
    return this.http.post(URL_SERVICIOSBACK+"contrato/subirWord/"+idTrab,formData);
  }

  descargarArchivoDerHab(idDerechoHabiente){
    return this.http.get(URL_SERVICIOSBACK+"derechohabientes/descargar/"+idDerechoHabiente, {
      responseType: "arraybuffer"
      });
  }

  registrarDH(derechoH){
      return this.http.post(URL_SERVICIOSBACK+"derechohabientes/registrar", derechoH);
  }

  listarDerHabActivo(trab){
    return this.http.post(URL_SERVICIOSBACK+"derechohabientes/listarActivo",trab)
  }

  listarDerHabInactivo(trab){
    return this.http.post(URL_SERVICIOSBACK+"derechohabientes/listarInactivo",trab)
  }

  darBajaDH(derechoH){
    return this.http.post(URL_SERVICIOSBACK+"derechohabientes/darBaja",derechoH);
  }

  subirArchivo(archivo:File, idDH:number){
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK+"derechohabientes/subirArchivo/"+idDH,formData);
  }

  listarTrabRemu(trab){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/listarTrabRemu",trab)
  }

  listarTrabDsct(trab){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/listarTrabDsct",trab)
  }

  listarDsct(empresa){
    return this.http.post(URL_SERVICIOSBACK+"descuentos/listar",empresa)
  }

  listarRemu(empresa){
    return this.http.post(URL_SERVICIOSBACK+"remuneraciones/listar",empresa);
  }

  agregarRemu(trabDTO){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/registrarTrabRemu",trabDTO);
  }

  agregarDsct(trabDTO){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/registrarTrabDsct",trabDTO);
  }

  darBajaRemu(trabRemu){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/darBajaRemu",trabRemu)
  }

  darBajaDsct(trabDsct){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/darBajaDsct",trabDsct)
  }

  listarTrabRemuInac(trab){
   return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/listarTrabRemuInac",trab)
  }

  listarTrabDsctInac(trab){
   return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/listarTrabDsctInac",trab)
  }

  activarRemu(trabRemu){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/activarRemu",trabRemu)
  }

  activarDsct(trabDsct){
    return this.http.post(URL_SERVICIOSBACK+"trabRemuDsct/activarDsct",trabDsct)
  }

  liquidar(contratoDto){
    return this.http.post(URL_SERVICIOSBACK+"trabajador/liquidar",contratoDto)
  }

  subirFoto(archivo: File, idTrabajador) {
    let formData = new FormData();
    formData.append("file", archivo);
    return this.http.post(URL_SERVICIOSBACK + "trabajador/cambiarFoto/"+ idTrabajador, formData);
  }

  eliminarFoto(contrato){
    return this.http.post(URL_SERVICIOSBACK+"trabajador/eliminarFoto",contrato)
  }

  setContrato(cont){
    this.contrato = cont;
  }
  getContrato () {
    return this.contrato;
  }

  generarReporteTrabajadorGen(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'generarExcel/generarReportTrabajGen' , empresaDTO);
  }

  generarReporteTrabajador4TA(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'generarExcel/generarReportTrabaj4TA' , empresaDTO);
  }

  generarReporteTrabajador5TA(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK + 'generarExcel/generarReportTrabaj5TA' , empresaDTO);
  }

  descargarReporte(reporte:string){
    return this.http.get(URL_SERVICIOSBACK+"generarExcel/descargar/"+reporte, {
      responseType: "arraybuffer"
      });
  }

  listarTipoPlanillaPorCategoria(categoria,IDEmpresa){
    return this.http.post(URL_SERVICIOSBACK +"tipoPlanilla/listarPorCategoria/"+IDEmpresa,categoria);
  }

  //ruben
  existeNroDoc(nrodoc:string){
    return this.http.post(URL_SERVICIOSBACK+"trabajador/existeNroDoc", nrodoc)
  }

  cargaExcelMasiva(excel:File){
    let formData = new FormData();
    formData.append("file", excel);
    return this.http.post(URL_SERVICIOSBACK+"trabajador/cargaMasiva",formData);
  }
}
