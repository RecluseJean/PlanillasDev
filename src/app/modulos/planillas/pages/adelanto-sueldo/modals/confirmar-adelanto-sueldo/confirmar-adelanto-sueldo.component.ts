import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-adelanto-sueldo',
  templateUrl: './confirmar-adelanto-sueldo.component.html',
  styles: []
})
export class ConfirmarAdelantoSueldoComponent implements OnInit {

  @Input() input_adelantoSueldoDTO;

  adelantoSueldoDTO: any;

  constructor(
    public activemodal : NgbActiveModal,
    public planillasService: PlanillasService,
  ) { }

  ngOnInit() {//debugger
    this.adelantoSueldoDTO = this.input_adelantoSueldoDTO;
  }

  registrarSolcitud() { //debugger
    if(this.adelantoSueldoDTO.accion=="S"){//debugger
      this.planillasService.generarSolicitud(this.adelantoSueldoDTO).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
          this.activemodal.dismiss();
        } else if(resp.estado == 2){
          Swal.fire(Constantes.INFO, resp.msg, 'info')
          this.close();
        } else { Swal.fire(Constantes.ERROR, resp.msg, 'error');  this.activemodal.dismiss(); }
      },
        (err) => {
          Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
        });
    }else{
      this.planillasService.registarSolicitud(this.adelantoSueldoDTO).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
          this.activemodal.dismiss();
        } else if(resp.estado == 2){
          Swal.fire(Constantes.INFO, resp.msg, 'info')
          this.close();
        } else { Swal.fire(Constantes.ERROR, resp.msg, 'error');  this.activemodal.dismiss(); }
      },
        (err) => {
          Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
        });
    }
  }

  close(){
    this.activemodal.close('Cancelado');
  }

}
