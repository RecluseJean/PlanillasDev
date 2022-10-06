import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';

@Component({
  selector: 'app-confirmar-prestamo',
  templateUrl: './confirmar-prestamo.component.html',
  styles: []
})
export class ConfirmarPrestamoComponent implements OnInit {

  @Input() input_prestamoDTO;

  prestamoDTO: any;

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
  ) { }

  ngOnInit() {
    this.prestamoDTO = this.input_prestamoDTO;
  }

  registrarPrestamo() {
    this.planillasService.registrarPrestamo(this.prestamoDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.activemodal.dismiss();
      } else if (resp.estado == 2) {
        Swal.fire(Constantes.INFO, resp.msg, 'info')
        this.close();
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); this.activemodal.dismiss(); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
  }

  close() {
    this.activemodal.close('Cancelado');
  }
}
