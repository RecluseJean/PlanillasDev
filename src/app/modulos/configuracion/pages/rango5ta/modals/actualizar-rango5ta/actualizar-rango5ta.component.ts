import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Rango5ta } from '../../../../../../models/rango5ta';
import { ConfirmarRango5taComponent } from '../confirmar-rango5ta/confirmar-rango5ta.component';

@Component({
  selector: 'app-actualizar-rango5ta',
  templateUrl: './actualizar-rango5ta.component.html',
  styles: []
})
export class ActualizarRango5taComponent implements OnInit, OnDestroy {

  @Input() input_rango5ta;
 

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  rango5ta: any = new Rango5ta();
  modalRef: NgbModalRef;


  ngOnInit() {debugger

    if (this.input_rango5ta != null) {
      this.rango5ta = this.input_rango5ta;


    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  confirmarActualizarRango5ta() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarRango5taComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_rango5ta = this.rango5ta;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }
}
