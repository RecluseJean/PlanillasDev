import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { CuentaCargo } from '../../../../../../models/Cuenta-Cargo';

@Component({
  selector: 'app-confirmar-cuenta-cargo',
  templateUrl: './confirmar-cuenta-cargo.component.html',
  styles: []
})
export class ConfirmarCuentaCargoComponent implements OnInit {

  @Input() input_cuentaCargo;

  cuentaCargo: any = new CuentaCargo();
  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.input_cuentaCargo = this.input_cuentaCargo
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  eliminarCuentaCargo() {
    this.empresaService.eliminarCuentaCargo(this.input_cuentaCargo.idCuentaCargo).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

}
