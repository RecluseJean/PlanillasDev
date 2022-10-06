import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Planilla } from '../../../../../../../models/Planilla';
import { PrevisualizacionPlanillaComponent } from '../../previsualizacion-planilla/previsualizacion-planilla.component';
import { EliminarBoletaComponent } from '../../eliminar-boleta/eliminar-boleta.component';



@Component({
    selector: 'app-mostrar-boleta-buscada',
    templateUrl: './mostrar-boleta-buscada.component.html',
    styles : []
})
export class MostrarBoletaBuscadaComponent implements OnInit, OnDestroy{
    
    @Input() input_planilla;

    public planilla: any = new Planilla();
    modalRef: NgbModalRef;

    constructor(
        public activemodal : NgbActiveModal,
        private modalService: NgbModal
    ){}

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }  }
    
    ngOnInit(){
        this.planilla = this.input_planilla;
    }

    previsualizarPlanilla(){
         this.modalRef = this.modalService.open(PrevisualizacionPlanillaComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'lg'
            }
          );
          this.modalRef.componentInstance.input_planilla_historica=this.planilla;
          this.modalRef.result.then((result) => {
         }, (reason) => {
         });
    }

    eliminarPlanilla(){
      this.modalRef = this.modalService.open(EliminarBoletaComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'sm'
            }
          );
          this.modalRef.componentInstance.input_planilla=this.planilla;
          this.modalRef.result.then((result) => {
         }, (reason) => {
            this.activemodal.dismiss();
         });
    }

    close(){
        this.activemodal.dismiss('Cancelado');
      }


}
