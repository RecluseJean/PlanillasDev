import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { RemuneracionesService } from '../../../../../configuracion/services/remuneraciones/remuneraciones.service';
import { DescuentosService } from '../../../../../configuracion/services/descuentos/descuentos.service';
import { Trabajador } from '../../../../../../models/Trabajador';
import { Empresa } from '../../../../../../models/Empresa';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-remu-dsct',
  templateUrl: './nuevo-remu-dsct.component.html',
  styles: []
})
export class NuevoRemuDsctComponent implements OnInit {

  @Input() input_trab;

  trabajador: Trabajador = new Trabajador();
  empresa: Empresa = new Empresa();
  lsRemu: any[] = [];
  lsDsct: any[] = [];

  idRemu: number = 0;
  idDsct: number = 0;

  activarBoton = true;

  constructor(
    private activemodal: NgbActiveModal,
    public router: Router,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.trabajador = this.input_trab;
    if (this.trabajador.accion == "R") {
      this.listarRemu();
    } else {
      this.listarDsct();
    }
  }

  listarRemu() {
    this.trabajadorService.listarRemu(this.empresa).subscribe((resp: any) => {
      this.lsRemu = resp.aaData;
    })
  }

  listarDsct() {
    this.trabajadorService.listarDsct(this.empresa).subscribe((resp: any) => {
      this.lsDsct = resp.aaData;
    })
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  agregar() {
    if (this.trabajador.accion == "R") {
      this.agregarRemu();
    } else {
      this.agregarDsct();
    }

  }

  agregarRemu() {
    var tmp = {
      "trabajador": this.trabajador,
      "remuneraciones": {
        "idRemuneraciones": this.idRemu
      }
    }
    this.trabajadorService.agregarRemu(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        // this.refrescar(this.router.url);
      } else if(resp.estado == 2){
        Swal.fire(Constantes.INFO, resp.msg, 'info');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  agregarDsct() {
    var tmp = {
      "trabajador": this.trabajador,
      "descuentos": {
        "idDescuentos": this.idDsct
      }
    }
    this.trabajadorService.agregarDsct(tmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        // this.refrescar(this.router.url);
      } else if(resp.estado == 2){
        Swal.fire(Constantes.INFO, resp.msg, 'info');
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

  activarBtn(event) {
    if (event == null) {
        this.activarBoton = true;
    } else {
      this.activarBoton = false;
    }
}

}
