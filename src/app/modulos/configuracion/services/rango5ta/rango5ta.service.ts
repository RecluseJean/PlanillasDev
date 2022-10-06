import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { Empresa } from '../../../../models/Empresa';

@Injectable()
export class Rango5taService {

  constructor(public http: HttpClient) {
  }

/*   registrarEmpresa(empresa) {
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'empresa/registrar',empresa);
    return res;
  } */

   actualizarRango5ta(rango5ta){
    var res:any;
    res=this.http.put(URL_SERVICIOSBACK + 'rango5ta/actualizar5ta',rango5ta);
    return res;
  }

   eliminarRango5ta(empresa){
    var res:any;
    res=this.http.delete(URL_SERVICIOSBACK + 'rango5ta/'+empresa.idEmpresa);
    return res;
  } 
 
  listarRango5ta(empresa: Empresa){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'rango5ta/porEmpresa', empresa)
    return res;
  }

/*   listarRango5taInactiva(){
     return this.http.get(URL_SERVICIOSBACK + 'empresa/listarInactivas');
  } */

  // listarTipoEmpresa(){
  //   return this.http.get(URL_SERVICIOSBACK + 'tipoEmpresa/listar');
  // }

  /* listarRegTributario(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'regimenTributario/listar')
    return res;
  }

  listarEncargadoPlan(empresa){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/listar",empresa);
  }

  listarEncargadoPlanInac(empresa){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/listarInac",empresa);
  }

  registrarEncargadoPlan(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/registrar",empresaDTO);
  }

  darBaja(encarPlan){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/darBaja",encarPlan)
  }

  activar(encarPlan){
    return this.http.post(URL_SERVICIOSBACK+"encargadoPlanilla/activar",encarPlan)
  }

  registrarCuentaCargo(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/registrar",empresaDTO);
  }

  modificarCuentaCargo(cuentaCargo){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/modificar",cuentaCargo)
  }

  eliminarCuentaCargo(idCuentaCargo){
    return this.http.delete(URL_SERVICIOSBACK+"cuentaCargo/"+idCuentaCargo);
  }

  listarCuentaCargo(empresa){
    return this.http.post(URL_SERVICIOSBACK+"cuentaCargo/listar",empresa)
  }

  listarBanco(){
    return this.http.get(URL_SERVICIOSBACK+"banco/listar")
  }

  subirLogo(archivo: File, id) {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(URL_SERVICIOSBACK + "empresa/subirLogo", formData);
  }

  existeRuc(ruc:string){
    return this.http.post(URL_SERVICIOSBACK+"empresa/existeRuc", ruc)
  }

  darBajaEmpresa(empresa){
    return this.http.post(URL_SERVICIOSBACK+"empresa/darBaja", empresa)
  }

  activarEmpresa(empresa){
    return this.http.post(URL_SERVICIOSBACK+"empresa/activar", empresa)
  } */
}
