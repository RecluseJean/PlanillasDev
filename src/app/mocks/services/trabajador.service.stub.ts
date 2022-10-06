import {of} from 'rxjs';
import ConstantesDatosPrueba from '../ConstantesMockito';

export class TrabajadorServiceStub{
    
    private lsTipoDoc = ConstantesDatosPrueba.ResponseWrapperListaTipoDoc;
    private lsEstadoCivil = ConstantesDatosPrueba.ResponseWrapperListaEstdCivil;
    private lsPais = ConstantesDatosPrueba.ResponseWrapperListaPais;
    private lsDepa = ConstantesDatosPrueba.ResponseWrapperListaDepa;
    private lsProv = ConstantesDatosPrueba.ResponseWrapperListaProv;
    private lsDist = ConstantesDatosPrueba.ResponseWrapperListaDistrito;
    private lsTipoZona = ConstantesDatosPrueba.ResponseWrapperListaTipoZona;
    private lsNivelEduca = ConstantesDatosPrueba.ResponseWrapperListaNivelEdu;
    private lsOcupacion = ConstantesDatosPrueba.ResponseWrapperListaOcup;
    private lsAfp = ConstantesDatosPrueba.ResponseWrapperListaAfp;
    private lsEps = ConstantesDatosPrueba.ResponseWrapperListaEps;
    private lsSctr = ConstantesDatosPrueba.ResponseWrapperListaSctr;
    private lsSituacion = ConstantesDatosPrueba.ResponseWrapperListaSituac;
    private lsRegSalud = ConstantesDatosPrueba.ResponseWrapperListaRegSal;
    private lsRegLaboral = ConstantesDatosPrueba.ResponseWrapperListaRegLab;
    private lsBanco = ConstantesDatosPrueba.ResponseWrapperListaBanco;
    private lsTipoContrato = ConstantesDatosPrueba.ResponseWrapperListaTipCont;
    private lsAreaDepEmp = ConstantesDatosPrueba.ResponseWrapperListaAreaDepEmp;
    private lsPuesto = ConstantesDatosPrueba.ResponseWrapperListaPuesto;
    private lsCentroCosto = ConstantesDatosPrueba.ResponseWrapperListaCenCost;
    private lsTipoPago = ConstantesDatosPrueba.ResponseWrapperListaTipPago;
    private CRUDtrab = ConstantesDatosPrueba.ResponseWrapperCRUDTrab;
    
    listarTipoDoc(){
      return of(this.lsTipoDoc)
    }
    
      listarPais(){
        return of(this.lsPais)
      }
    
      listarEstadoCivil(){
        return of(this.lsEstadoCivil)
      }
    
      listarDepartamento(){
        return of(this.lsDepa)
      }
    
      listarProvincia(departamento){
        return of(this.lsProv)
      }
    
      listarDistrito(provincia){
        return of(this.lsDist)
      }
    
      listarTipoZona(){
        return of(this.lsTipoZona)
      }
    
      listarNivelEdu(){
        return of(this.lsNivelEduca)
      }
    
      listarOcupacion(){
        return of(this.lsOcupacion)
      }
    
      listarAfp(empresa){
        return of(this.lsAfp)
      }
    
      listarEps(){
        return of(this.lsEps)
      }
    
      listarRegSalud(){
        return of(this.lsRegSalud)
      }
    
      listarSituacion(){
        return of(this.lsSituacion)
      }
    
      listarRegLaboral(){
        return of(this.lsRegLaboral)
      }
    
      listarTipoContrato(){
        return of(this.lsTipoContrato)
      }
    
      listarCentroCosto(empresa){
        return of(this.lsCentroCosto)
      }

      listarAreaDepEmp(empresa) {
        return of(this.lsAreaDepEmp)
      }
      
      listarPuesto(areaDepEmp) {
        return of(this.lsPuesto)
      }
    
      listarTipoPago(){
        return of(this.lsTipoPago)
      }
    
      listarBanco(){
        return of(this.lsBanco)
      }
    
      listarSctr(){
        return of(this.lsSctr)
      }
    
      insertarTrabajador(trabajador){
        return of(this.CRUDtrab)
      }
    
      listarTrabajador(empresa){
        return of(this.CRUDtrab)
      }

      listarTrabajadorPorComprobante(empresa,number){
        return of(this.CRUDtrab)
      }
    
      actualizarTrabajador(trabajador){
        return of(this.CRUDtrab)
      }

      generarContrato(estado){
        return of({
          "estado":estado,
          "msg":"Contrato generado correctamente"
        })
      }

      descargarContrato(estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }

      
      subirContrato(selecArch,estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }

      registrarDH(estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }

      listarXTrab(estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }

      darBajaDH(estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }

      subirArchivo(archivo,estado){
        return of({
          "estado":estado,
          "msg":"Contrato descargado"
        })
      }
}

