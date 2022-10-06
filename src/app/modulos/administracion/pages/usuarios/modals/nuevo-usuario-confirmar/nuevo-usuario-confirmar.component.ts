import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-usuario-confirmar',
  templateUrl: './nuevo-usuario-confirmar.component.html',
  styles: []
})
export class NuevoUsuarioConfirmarComponent implements OnInit {

  @Input() input_usuario_final;
  // @Input() input_foto: File;
  obj_usuario: any = null;
  estado: number;

  constructor(
    public activemodal: NgbActiveModal,
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.obj_usuario = this.input_usuario_final;
  }

  crud() {
    switch (this.obj_usuario.usuario.accion) {
      case Constantes.ACTUALIZAR: this.actualizarUsuario();
        break;
      case Constantes.ELIMINAR: ;
        break;
      default: this.registrarUsuario();
    }
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.obj_usuario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        // this.usuarioService.subirFoto(this.input_foto, resp.defaultObj.idUsuario).subscribe((result: any) => {
        //   if (result.estado == 1) {
        //     Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        //     this.refrescar(this.router.url);
        //   }
        // }, (err) => {
        //   Swal.fire(Constantes.ERROR, err.error.error, 'error');
        // });
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
        this.estado = 1;

      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
        this.refrescar(this.router.url);
        this.estado = 0;
      }
    })
    this.activemodal.dismiss();
  }

  actualizarUsuario() {
    this.obj_usuario.usuario.perfil.idPerfil = this.obj_usuario.perfil.idPerfil;
    this.usuarioService.actualizarUsuario(this.obj_usuario.usuario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        // this.usuarioService.subirFoto(this.input_foto, this.obj_usuario.usuario.idUsuario)
        //   .subscribe((result: any) => {
        //     if (result.estado == 1) {
        //   }
        // })
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
        this.estado = 1;

      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
        this.refrescar(this.router.url);
        this.estado = 0;
      }
    })
    this.activemodal.dismiss();
  }
}
