import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../modulos/administracion/services/usuarios/usuario.service';
import Swal from 'sweetalert2';
import Constantes from '../../../models/Constantes';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styles: []
})
export class RecuperarPasswordComponent {

  email: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    public usuarioService: UsuarioService,
  ) { }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  recuperarPassword(){
    this.usuarioService.registrarSolicitudRecuperarPass(this.email).subscribe((resp:any)=>{
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else if (resp.estado == 0) {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });

      this.activeModal.dismiss();
  }
}
