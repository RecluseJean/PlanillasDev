import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Eps } from '../../../../../../models/Eps';
import { ConfirmarNuevoEpsComponent } from '../confirmar-nuevo-eps/confirmar-nuevo-eps.component';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Empresa } from '../../../../../../models/Empresa';



@Component({
  selector: 'app-nuevo-eps',
  templateUrl: './nuevo-eps.component.html',
  styles: []
})
export class NuevoEpsComponent implements OnInit {

  @Input() input_eps;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  eps: any = new Eps();
  empresa: Empresa = new Empresa();
  eps_final: any;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.input_eps != null) {
      this.eps = this.input_eps;
    }
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  confirmarNuevoEps() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.eps_final = {
      'idEps': this.eps.idEps,
      'descripcion': this.eps.descripcion,
      'aporte': this.eps.aporte,
      'accion': this.eps.accion,
      'empresa': this.empresa
    }
    const modalRef = this.modalService.open(ConfirmarNuevoEpsComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_eps = this.eps_final;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }

  verificarCantidad(aporte) {
    if (typeof aporte != 'number') {
      this.eps.aporte = 0;
      Swal.fire(Constantes.WARNING, 'Numero invalido', 'warning');
    }
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var tecla_final = String.fromCharCode(tecla);
    var patron = /[0.0-9.9]/;
    if (!patron.test(tecla_final)) {debugger
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }

    //inicio ruben
    validarData(){debugger
      var clean:string = null;
      var cant_dig = this.validateDecimal(this.eps.aporte);
      if (cant_dig == false && this.eps.aporte != "") {
        Swal.fire({ title: "El aporte debe ser un númerico decimal", timer: 2000, showConfirmButton: false });
        this.eps.aporte = clean;
      }
    }

    validateDecimal(valor) {debugger
      //var RE = /^\d*(\.\d{1})?\d{0,1}$/;
      var RE = /\d*\.\d*/;
      if (RE.test(valor)) {debugger
          return true;
      } else {
          return false;
      }
  }


}
