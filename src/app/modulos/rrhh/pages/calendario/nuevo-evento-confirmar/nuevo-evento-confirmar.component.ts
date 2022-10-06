import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Evento } from '../../../../../models/Evento';
import { CalendarioService } from '../../../services/calendario/calendario.service';
import Constantes from '../../../../../models/Constantes';


@Component({
  selector: 'app-nuevo-evento-confirmar',
  templateUrl: 'nuevo-evento-confirmar.component.html',
  styles: []
})
export class NuevoEventoConfirmarComponent implements OnInit {

  @Input() input_horario_final;
  @Input() input_actividad;

  horario: any;
  eventoDto: any;
  ocupacion: number = null;
  public evento: any = new Evento();

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public calendarioService: CalendarioService,
  ) { }

  ngOnInit() {
    this.eventoDto=this.input_actividad;
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

  crud() {debugger
    switch (this.evento.accion) {
      case Constantes.ACTUALIZAR: this.actualizarHorario(); break;
      case Constantes.ELIMINAR: this.eliminarHorario() ; break;
      default: this.registrarActividad(); break;
    }
  }

  actualizarHorario() {
    this.calendarioService.actualizarHorario(this.horario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    })
    this.activemodal.dismiss();
  }

  registrarActividad() {
    this.calendarioService.registrarEvento(this.eventoDto).subscribe((resp: any) => {debugger
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
    this.calendarioService.nulearHorario(this.horario).subscribe((resp:boolean) => {
      if (resp) {
        this.calendarioService.eliminarHorario(this.horario).subscribe((resp: any) => {
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
