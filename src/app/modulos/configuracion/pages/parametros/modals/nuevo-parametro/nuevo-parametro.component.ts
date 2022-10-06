import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ConfirmarNuevoParametroComponent } from '../confirmar-nuevo-parametro/confirmar-nuevo-parametro.component';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Parametros } from '../../../../../../models/parametros.models'
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-parametro',
  templateUrl: './nuevo-parametro.component.html',
  styles: []
})
export class NuevoParametroComponent implements OnInit, OnDestroy {

  @Input() input_parametro;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  parametro: any = new Parametros();
  varInpPar: boolean = true;
  varSelPar: boolean = true;
  varSelParR: boolean = true;
  modalRef: NgbModalRef;

  lsTipoTardanza: any[] = Constantes.TIPOTARDANZA;
  lsTipoRango: any[] = Constantes.TIPORANGO;


  ngOnInit() {
    this.parametro = this.input_parametro;
    this.revisarParemetro();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  revisarParemetro() {
    if (this.parametro.codigo == Constantes.a) {
      this.varSelPar = false;
    } else if (this.parametro.codigo == Constantes.b) {
      this.varSelParR = false;
    } else {
      this.varInpPar = false;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmarNuevoParametro() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarNuevoParametroComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_parametro = this.parametro;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0.0-9.9]/;
    var tecla_final = String.fromCharCode(tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }

}
