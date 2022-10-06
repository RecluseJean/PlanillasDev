import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { BuzonSugerenciaService } from '../../../../services/buzon-sugerencia/buzon-sugerencia.service';
import { Sugerencias } from '../../../../../../models/Sugerencias';


@Component({
  selector: 'app-nueva-sugerencia-confirmar',
  templateUrl: 'nueva-sugerencia-confirmar.component.html',
  styles: []
})
export class NuevaSugerenciaConfirmarComponent implements OnInit {

  @Input() input_horario_final;
  @Input() input_sugerencia;

  sugerenciaDto: any;
  horario: any;
  public sugerencias: any = new Sugerencias();

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public sugerenciasService: BuzonSugerenciaService
  ) { }

  ngOnInit() {
    this.sugerenciaDto=this.input_sugerencia;
    this.horario = Object.assign({}, this.input_horario_final);
    this.horario.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  crud() {
    switch (this.horario.accion) {
      case Constantes.ACTUALIZAR: this.actualizarHorario(); break;
      case Constantes.ELIMINAR: this.eliminarHorario() ; break;
      default: this.registrarSugerencia(); break;
    }
  }

  actualizarHorario() {
    this.sugerenciasService.actualizarHorario(this.horario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    })
    this.activemodal.dismiss();
  }

  registrarSugerencia() {
    this.sugerenciasService.registrarSugerencia(this.sugerenciaDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    })
    this.activemodal.dismiss();
  }

  eliminarHorario() {
    this.sugerenciasService.nulearHorario(this.horario).subscribe((resp:boolean) => {
      if (resp) {
        this.sugerenciasService.eliminarHorario(this.horario).subscribe((resp: any) => {
          if (resp.estado == 1) {
            Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
            this.refrescar(this.router.url);
          } else {
            Swal.fire(Constantes.ERROR, resp.msg, 'error');
          }
        })
      } else {
        Swal.fire(Constantes.ERROR, "Surgió un error inesperado", 'error');
      }
    })
    this.activemodal.dismiss();
  }
}
