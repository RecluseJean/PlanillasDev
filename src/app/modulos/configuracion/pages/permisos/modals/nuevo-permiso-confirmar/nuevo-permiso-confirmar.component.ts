import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TiposPermisoService } from '../../../../services/permisos/permisos.service';
import { Empresa } from '../../../../../../models/Empresa';



@Component({
  selector: 'app-nuevo-permiso-confirmar',
  templateUrl: './nuevo-permiso-confirmar.component.html',
  styles: []
})
export class NuevoTipoPermisoConfirmarComponent implements OnInit {

  @Input() input_permiso;
  objPermiso: any;
  empresa: Empresa = new Empresa();

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public permisoService: TiposPermisoService
  ) { }

  ngOnInit() {
    this.objPermiso = this.input_permiso;
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud() {
    switch (this.objPermiso.accion) {
      case Constantes.ACTUALIZAR: this.actualizarPermiso();
        break;
      case Constantes.ELIMINAR: this.eliminarPermiso();
        break;
      default: this.registrarPermiso();
    }
  }

  eliminarPermiso() {debugger
    this.permisoService.eliminarPermiso(this.objPermiso.idTipoPermiso).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })
    Swal.fire(Constantes.ERROR_FK_P)
    
  }

  actualizarPermiso() {
    let permiso_final = {
      'tipoPermiso': this.objPermiso,
      'empresa': this.empresa
    }
    this.permisoService.actualizarPermiso(permiso_final).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public registrarPermiso() {
    let permiso_final = {
      'tipoPermiso': this.objPermiso,
      'empresa': this.empresa
    }
    this.permisoService.registrarPermiso(permiso_final).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
