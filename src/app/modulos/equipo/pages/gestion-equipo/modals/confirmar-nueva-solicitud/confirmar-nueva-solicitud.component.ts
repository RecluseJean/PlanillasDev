import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { GestionEquipoService } from '../../../../services/gestion-equipo/gestion-equipo.service';

@Component({
  selector: 'app-confirmar-nueva-solicitud',
  templateUrl: './confirmar-nueva-solicitud.component.html',
  styles: []
})
export class ConfirmarNuevaSolicitudComponent implements OnInit {

  @Input() input_solicitudDto;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public gestionEquipoService: GestionEquipoService
  ) { }

  solicitudDto: any;

  ngOnInit() {
    this.solicitudDto = this.input_solicitudDto;
  }

  public registrar() {
    this.gestionEquipoService.registrarSolicitud(this.solicitudDto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url)
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
