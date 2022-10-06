import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { Usuario } from '../../../../../../models/usuario.model';
import { NuevoPasswordConfirmarComponent } from '../nuevo-password-confirmar/nuevo-password-confirmar.component';


@Component({
  selector: 'app-nuevo-password',
  templateUrl: './nuevo-password.component.html',
  styles: []
})
export class NuevoPasswordComponent implements OnInit {
  @Input() input_usuario;

  //oldpass: string = "";
  confirm: string = "";
  validar: boolean = true;
  rol: number;
  usuario: Usuario = new Usuario();
  objUsuario: any;
  modalRef: NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    public modalService: NgbModal,
    public router: Router,
    public usuarioService: UsuarioService

  ) { }

  ngOnInit() {
    this.usuario = this.input_usuario;
    this.usuario.password = null;
    this.rol = this.input_usuario.perfil.idPerfil;
  }

  public close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  verificarContrasena(event) {
    if (event) {
      if (this.usuario.password == this.confirm) {
        this.validar = true;
      } else {
        this.validar = false;
      }
    } else {
      this.confirm = "";
      this.usuario.password = "";
      this.validar = true;
    }
  }

  async confirmarNuevoPass() {
    this.modalRef = this.modalService.open(NuevoPasswordConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_usuario = this.usuario;
    //this.modalRef.componentInstance.input_old_pass = this.oldpass;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }


}
