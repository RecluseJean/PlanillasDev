import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoDescuentoConfirmarComponent } from '../nuevo-descuento-confirmar/nuevo-descuento-confirmar.component';
import { Descuento } from '../../../../../../models/Descuento';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-nuevo-descuento',
  templateUrl: './nuevo-descuento.component.html',
  styles: []
})
export class NuevoDescuentoComponent implements OnInit {

  @Input() input_dsct;

  descuento: any = new Descuento();
  idTipoDsct: number;
  lsTipoDsct: any[] = Constantes.tipoRem;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    if (this.input_dsct != null) {
      this.descuento = this.input_dsct;
      this.idTipoDsct = this.descuento.tipoDsct;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmar(){
    this.descuento.tipoDsct = this.idTipoDsct;
    const modalRef = this.modalService.open(NuevoDescuentoConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    modalRef.componentInstance.input_dsct = this.descuento;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

}
