import { Component, OnInit, Input } from '@angular/core';
import { DescuentosService } from '../../../../services/descuentos/descuentos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Empresa } from '../../../../../../models/Empresa';
import { Descuento } from '../../../../../../models/Descuento';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-descuento-confirmar',
  templateUrl: './nuevo-descuento-confirmar.component.html',
  styles: []
})
export class NuevoDescuentoConfirmarComponent implements OnInit {

  @Input() input_dsct;

  empresa: Empresa = new Empresa();
  descuento: any = new Descuento();
  constructor(
    private descuentoService: DescuentosService,
    public activemodal: NgbActiveModal,
    public router: Router,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.descuento = this.input_dsct;
  }

  crud() {
    if (this.descuento.accion == "U") {
      this.modificar();
    } else if (this.descuento.accion == "D") {
      this.darBaja();
    } else if (this.descuento.accion == "A") {
      this.activar();
    } else {
      this.registrar();
    }
  }

  registrar() {
    var tmp = {
      "empresa": this.empresa,
      "descuentos": this.descuento
    }
    this.descuentoService.registrarDsct(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  modificar() {
    this.descuentoService.modificarDsct(this.descuento).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  darBaja() {
    this.descuentoService.darBajaDsct(this.descuento).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  activar() {
    this.descuentoService.activarDsct(this.descuento).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.refrescar(this.router.url);
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
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

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
