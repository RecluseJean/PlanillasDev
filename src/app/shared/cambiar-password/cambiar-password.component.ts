import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../models/Constantes';
import { UsuarioService } from '../../modulos/administracion/services/usuarios/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styles: []
})
export class CambiarPasswordComponent implements OnInit {

  pass1: string;
  pass2: string;

  usuario = new Usuario();
  constructor(
    public router: Router,
    private routerAct: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario.idUsuario = +this.routerAct.snapshot.paramMap.get('id');
    this.validarSolicitud();
  }

  validarSolicitud() {
    this.usuarioService.validarSolicitudRecuperarPass(this.usuario).subscribe((resp: any) => {
      if (resp.estado == 0) {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
        this.router.navigate(["/login"]);
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
        this.router.navigate(["/login"]);
      }
    })
  }

  cambiarPassword() {
    if (this.pass1 == this.pass2) {
      this.usuario.password = this.pass1;
      this.usuarioService.CambiarPasswordSolicitudRecuPass(this.usuario).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
          this.router.navigate(["/login"]);
        } else {
          Swal.fire(Constantes.ERROR, resp.msg, 'error');
          this.router.navigate(["/login"]);
        }
      })
    } else {
      Swal.fire(Constantes.INFO, 'Las contraseñas deben ser iguales', 'info');
    }

  }

}
