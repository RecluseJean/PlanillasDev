import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EncargadoPlanilla } from '../../../../../../models/Encargado-Planilla';
import { EmpresaService } from '../../../../services/empresa/empresa.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-encargado-planilla',
  templateUrl: './confirmar-encargado-planilla.component.html',
  styles: []
})
export class ConfirmarEncargadoPlanillaComponent implements OnInit {

  @Input() input_encarPlan;

  encarPlan: EncargadoPlanilla = new EncargadoPlanilla();

  constructor(
    public activemodal: NgbActiveModal,
    public empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.encarPlan = this.input_encarPlan;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  seleccionar(){
    if(this.encarPlan.accion=="A"){
      this.activar()
    } else {
      this.darBaja();
    }
  }

  darBaja() {
    this.empresaService.darBaja(this.encarPlan).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss("accion");
  }

  activar() {
    this.empresaService.activar(this.encarPlan).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss("accion");
  }

}
