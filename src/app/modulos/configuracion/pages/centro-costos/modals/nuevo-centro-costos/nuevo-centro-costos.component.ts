import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroCostos } from '../../../../../../models/centro-costos';
import { ConfirmarNuevoCentroCostosComponent } from '../confirmar-nuevo-centro-costos/confirmar-nuevo-centro-costos.component';

@Component({
  selector: 'app-nuevo-centro-costos',
  templateUrl: './nuevo-centro-costos.component.html',
  styles: []
})
export class NuevoCentroCostosComponent implements OnInit {

  @Input() input_centro_costos;

  constructor(
    public activemodal:NgbActiveModal,
    private modalService: NgbModal
  ) { }

  centroCostos: any = new CentroCostos();

  ngOnInit() {
    
    if (this.input_centro_costos != null) {
      this.centroCostos = this.input_centro_costos;
    }
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  confirmarNuevoCentroCostos(){
    this.openModalConfirmar();
  }

  openModalConfirmar(){
    const modalRef = this.modalService.open(ConfirmarNuevoCentroCostosComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_centro_costos = this.centroCostos;
    modalRef.result.then((result) => {
   }, (reason) => {
      this.activemodal.close();
   });
  }

}

