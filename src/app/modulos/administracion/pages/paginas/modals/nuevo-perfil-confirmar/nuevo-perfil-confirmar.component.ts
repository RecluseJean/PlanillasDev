import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';

@Component({
  selector: 'app-nuevo-perfil-confirmar',
  templateUrl: './nuevo-perfil-confirmar.component.html',
  styles: []
})
export class NuevoPerfilConfirmarComponent implements OnInit {

  @Input() input_perfil_nuevo;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  public registroPerfil(){
    var perfil = {
      "ambito": 1,
      "estado": true,
      "nombres": this.input_perfil_nuevo.nombres
    }
    //console.log(perfil,"LLEVO");

    this._usuarioService.registrarPerfil(perfil).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        //console.log(err)
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
