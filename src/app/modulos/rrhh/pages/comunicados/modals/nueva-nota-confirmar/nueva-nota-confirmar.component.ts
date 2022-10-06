import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ComunicadosService } from '../../../../services/comunicados/comunicados.service';
import { Notas } from '../../../../../../models/Notas';

@Component({
  selector: 'app-nueva-nota-confirmar',
  templateUrl: 'nueva-nota-confirmar.component.html',
  styles: []
})
export class NuevaNotaConfirmarComponent implements OnInit {

  @Input() input_horario_final;
  @Input() input_notas;

  horario: any;
  notas: Notas = new Notas();
  notasDTO: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public comunicadosService: ComunicadosService
  ) { }

  ngOnInit() {
    this.notasDTO=this.input_notas;
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
    switch (this.notas.accion) {
      case Constantes.ACTUALIZAR: this.actualizarHorario(); break;
      case Constantes.ELIMINAR: this.eliminarHorario() ; break;
      default: this.registrarNota(); break;
    }
  }

  registrarNota() {debugger
    this.comunicadosService.registrarNota(this.notasDTO).subscribe((resp: any) => {debugger
      if (resp.estado == 1) {debugger
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    })
    this.activemodal.dismiss();
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
