import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { PrevisualizacionPlanillaComponent } from '../previsualizacion-planilla/previsualizacion-planilla.component';

@Component({
  selector: 'app-confirmar-calculo-planilla',
  templateUrl: './confirmar-calculo-planilla.component.html',
  styles: []
})
export class ConfirmarCalculoPlanillaComponent implements OnInit {

  @Input() input_planilla_final;

  constructor(
    public activemodal: NgbActiveModal,
    public planillasService: PlanillasService,
    private modalService: NgbModal
  ) { }

  planilla_final: any;
  planilla_historica: any;
  lsplanhDsctRemu: any [] = [];

  ngOnInit() {
    this.planilla_final = this.input_planilla_final
  }
  close() {
    this.activemodal.close('Cancelado');
  }
  closeTotal() {
    this.activemodal.dismiss({ accion: 'closeAll' });
  }

  previsualizar() {
    const modalRef = this.modalService.open(PrevisualizacionPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalLG'
      }
    );
    modalRef.componentInstance.input_planilla_historica = this.planilla_historica;
    modalRef.componentInstance.input_lsphDsctRemu = this.lsplanhDsctRemu;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  seleccionarTipo(){
    if(this.planilla_final.contrato == null ){
      this.generarPlanillaMasiva();
    } else {
      this.generarPlanilla();
    }
  }

  generarPlanillaMasiva() {
    this.planillasService.generarPlanilla(this.planilla_final).subscribe((resp: any) => {
      if (resp.estado == 1) {
        // this.planilla_historica = resp.defaultObj;
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    this.activemodal.dismiss();
  }

  generarPlanilla() {
    this.planillasService.encontrarPlanilla(this.planilla_final).subscribe((resp: any) => {
      if (resp.estado == 1 /*si encontro una planilla ya existente*/) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
        this.activemodal.dismiss();
      } else {
        this.planillasService.generarPlanilla(this.planilla_final).subscribe((resp: any) => {
          if (resp.estado == 1) {
            this.planilla_historica = resp.defaultObj;
            this.lsplanhDsctRemu = resp.aaData;
            this.previsualizar();
          } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
        },
          (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
        this.activemodal.dismiss();
      }
    });
  }
}
