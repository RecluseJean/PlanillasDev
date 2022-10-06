import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable()
export class EquipoService {

  constructor(public http: HttpClient) { }

  insertarEquipo(equipo){
    return this.http.post(URL_SERVICIOSBACK + 'equipo/registrar',equipo)
  }

  insertarTrabajadorEquipo(trabajador){
    return this.http.post(URL_SERVICIOSBACK + 'equipo/anadirTrabajador',trabajador)
  }

  listarEquipoxSupervisor(usuario) {
    return this.http.post(URL_SERVICIOSBACK + 'equipo/listarPorSupervisor',usuario)
  }

    //Lore
    listarEquipoxEmpresa(empresa){
      return this.http.post(URL_SERVICIOSBACK + 'equipo/listarPorEmpresa', empresa)
    }
    
    listarEquipoxGerente(empresa){
      return this.http.post(URL_SERVICIOSBACK + 'equipo/listarPorGerente', empresa)
    }

   listarTrabajadorEquipo(equip) {
    return this.http.post(URL_SERVICIOSBACK + 'equipo/listarEquipoTrab',equip)
  } 

  eliminarTrabajadorEquipo(trabEquip){
    const url = URL_SERVICIOSBACK + 'equipo/' + trabEquip.idEquipoTrabajadores;
    return this.http.delete(url,trabEquip)

  }
  
}
