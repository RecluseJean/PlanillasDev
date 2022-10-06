import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Eps } from '../../../../../../models/Eps';
import { EpsService } from '../../../../services/eps/eps.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-nuevo-eps',
  templateUrl: './confirmar-nuevo-eps.component.html',
  styles: []
})
export class ConfirmarNuevoEpsComponent implements OnInit {
  @Input() input_eps;

  constructor(
    public activemodal: NgbActiveModal,
    private EpsService: EpsService,
    public router: Router
  ) { }

  eps: Eps = new Eps();


  ngOnInit() {
    this.eps = this.input_eps;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  crud() {
    switch (this.eps.accion) {
      case Constantes.ACTUALIZAR: this.actualizarEps();
        break;
      case Constantes.ELIMINAR: this.eliminarEps();
        break;
      default: this.registrarEps();
    }
  }

  eliminarEps() {
    this.EpsService.eliminarEps(this.eps).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })
  }

  actualizarEps() {
    this.EpsService.actualizarEps(this.eps).subscribe((resp: any) => {
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

  public registrarEps() {

    this.EpsService.insertarEps(this.eps).subscribe((resp: any) => {
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
