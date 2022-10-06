import { Injectable } from '@angular/core';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TipoPlanillaService {

  constructor(
    private http: HttpClient
  ) { }

  generarAsistencia(empresaDTO){
    return this.http.post(URL_SERVICIOSBACK+"generarExcel/generar",empresaDTO)
  }

  descargarAsistencia(contrato){
    return this.http.get(URL_SERVICIOSBACK+"generarExcel/descargar/"+contrato, {
      responseType: "arraybuffer"
      });
  }

  listar(empresa){
    return this.http.post(URL_SERVICIOSBACK+"tipoPlanilla/listarPorEmpresa",empresa)
  }

  registrar(tipPlanillaDTO){
    return this.http.post(URL_SERVICIOSBACK+"tipoPlanilla/registrar", tipPlanillaDTO)
  }

  modificar(tipPlanilla){
    return this.http.post(URL_SERVICIOSBACK+"tipoPlanilla/modificar", tipPlanilla)
  }

  listarTipoPlanillaPorPerfil(perfil){
    return this.http.post(URL_SERVICIOSBACK +"tipoPlanilla/listarPorPerfil",perfil);
  }

  listarPerfiles(){
    return this.http.get(URL_SERVICIOSBACK+'modulo/listarPerfiles')
  }

  listarPerfilesPorTipoPlanilla(tipoPlanilla){
    return this.http.post(URL_SERVICIOSBACK + 'tipoPlanilla/listarPorTipoPlanilla',tipoPlanilla);
  }

  actualizarPerfiles(lsTipoPlanillaPerfiles){
    return this.http.put(URL_SERVICIOSBACK+'tipoPlanilla/modificarPlanillaPerfil',lsTipoPlanillaPerfiles)
  }

  eliminar(tipoPlanilla){
    return this.http.delete(URL_SERVICIOSBACK+'tipoPlanilla/'+tipoPlanilla.idTipoPlanilla)
  }

  listarTrabajadores(tipoPlanilla){
    return this.http.post(URL_SERVICIOSBACK+'tipoPlanilla/listarTrabajadores',tipoPlanilla)
  }
  listarTrabajadoresAsignados(tipoPlanilla){
    return this.http.post(URL_SERVICIOSBACK+'tipoPlanilla/listarTrabajadoresAsignados',tipoPlanilla)
  }

  listarTrabajadoresPorTipoPlanilla(tipoPlanilla){
    return this.http.post(URL_SERVICIOSBACK+'tipoPlanilla/listarTrabajadoresPorTipoPlanilla',tipoPlanilla)
  }

  agregarTrabajador(tipPlanillaDTO){
    return this.http.post(URL_SERVICIOSBACK+'tipoPlanilla/registrarTrabajador', tipPlanillaDTO)
  }

  quitarTrabajador(tipPlanDTO){
    return this.http.post(URL_SERVICIOSBACK+"tipoPlanilla/eliminarTPD", tipPlanDTO);
  }

  listarTipoPlanillaPorCategoria(categoria){
    return this.http.post(URL_SERVICIOSBACK +"tipoPlanilla/listarPorCategoria",categoria);
  }


}
