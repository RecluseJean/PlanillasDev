import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { Router } from '@angular/router';
import { Empresa } from '../../models/Empresa';

declare function init_plugins();

@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styleUrls: []
})
export class RecursosHumanosComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  empresa: any = new Empresa();
  
  ngOnInit() {
    init_plugins();
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.refrescarToken();
  }

  refrescarToken(){
    this.usuarioService.refreshToken().subscribe((resp:any)=>{
      localStorage.setItem('InfoToken',JSON.stringify(resp));
    })
  }
}
