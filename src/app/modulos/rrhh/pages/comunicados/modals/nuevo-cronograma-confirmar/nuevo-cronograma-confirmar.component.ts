import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';

@Component({
  selector: 'app-nuevo-cronograma-confirmar',
  templateUrl: 'nuevo-cronograma-confirmar.component.html',
  styles: []
})
export class NuevoCronogramaConfirmarComponent implements OnInit {

  @Input() input_horario_final;

  horario: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public comunicadosService: ComunicadosService
  ) { }

  ngOnInit() {
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
      default: this.registrarHorario(); break;
    }
  }

  actualizarHorario() {
    this.comunicadosService.actualizarHorario(this.horario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    })
    this.activemodal.dismiss();
  }

  registrarHorario() {
    this.comunicadosService.registrarHorario(this.horario).subscribe((resp: any) => {
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
    this.comunicadosService.nulearHorario(this.horario).subscribe((resp:boolean) => {
      if (resp) {
        this.comunicadosService.eliminarHorario(this.horario).subscribe((resp: any) => {
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
