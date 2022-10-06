import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  moduloSelect: number = 0;
  moduloName: string = "";
  lsmenu: any[] = [];
  openPerfil: boolean = false;
  token: any;
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem("InfoToken")) || '';
    this.cargaPaginasPorModulo();
  }



  cargaPaginasPorModulo() {
    var perfil: any;
    // if(token!=''){
    //    perfil={
    //     "idPerfil":token.id_perfil
    //   }
    // }else{
    //    perfil={
    //     "idPerfil":1
    //   }
    // }
    perfil = {
      "idPerfil": this.token.id_perfil
    }
    this._sidebar.cargarPaginasPerfil(perfil).subscribe(resp => {
      if (resp.estado == 1) {
        this.lsmenu = resp.aaData;
        for (let index = 0; index < this.lsmenu.length; index++) {
          this.lsmenu[index].open = false;
        }
      }
    });
  }

  collapsePerfil() {

    if (this.openPerfil) {
      this.openPerfil = !this.openPerfil;
    }
  }


  toggleCollapse(modulo: number) {
    for (let index = 0; index < this.lsmenu.length; index++) {
      const element = this.lsmenu[index];
      if (element.idModulo == modulo) {
        if (this.lsmenu[index].open) {
          this.lsmenu[index].open = false;
        } else {
          this.lsmenu[index].open = true;
        }
      } else {
        this.lsmenu[index].open = false;
      }
    }
    this.lsmenu.forEach(element => {
    });
    this.collapsePerfil();
  }

  logout() {

    this._usuarioService.logout();

  }

}
