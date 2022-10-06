import { Component, OnInit} from '@angular/core';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styles: []
})
export class TrabajadorComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.refrescarToken();
  }

  refrescarToken(){
    this.usuarioService.refreshToken().subscribe((resp:any)=>{
      localStorage.setItem('InfoToken',JSON.stringify(resp));
    })
  }

}
