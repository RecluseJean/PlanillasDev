import { Component, OnInit, Input } from '@angular/core';
import { Remuneracion } from '../../../../../../models/Remuneracion';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { NuevaRemuneracionConfirmarComponent } from '../nueva-remuneracion-confirmar/nueva-remuneracion-confirmar.component';

@Component({
  selector: 'app-nueva-remuneracion',
  templateUrl: './nueva-remuneracion.component.html',
  styles: []
})
export class NuevaRemuneracionComponent implements OnInit {

  @Input() input_rem;

  remuneracion: Remuneracion = new Remuneracion();
  lsTipoRem: any[] = Constantes.tipoRem;
  idTipoRem: number;
  checkEstado: boolean;
  estado:any;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.estado = document.getElementById('afec_dsct');
    this.checkEstado = this.estado.checked;

    if (this.input_rem != null) {
        this.remuneracion = this.input_rem;
        this.armarObjAct();
    }
  }

  armarObjAct(){
    this.idTipoRem = this.remuneracion.tipoRemuneracion;
    if(this.remuneracion.afectoDsct==1){
      this.checkEstado = true;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmar(){
    this.armarObj();
    const modalRef = this.modalService.open(NuevaRemuneracionConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    modalRef.componentInstance.input_rem = this.remuneracion;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarObj() {
    this.remuneracion.tipoRemuneracion = this.idTipoRem;
    if (this.checkEstado) {
      this.remuneracion.afectoDsct = 1;
    } else {
      this.remuneracion.afectoDsct = 0;
    }
  }

}
