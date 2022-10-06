import { Component, OnInit } from '@angular/core';
import { Año } from '../../../../../../models/Año';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarNuevoAnoComponent } from '../confirmar-nuevo-ano/confirmar-nuevo-ano.component';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-ano',
  templateUrl: './nuevo-ano.component.html',
  styles: []
})
export class NuevoAnoComponent implements OnInit {

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  ano: Año = new Año();

  ngOnInit() {

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  confirmarNuevoAno() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    const modalRef = this.modalService.open(ConfirmarNuevoAnoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_ano = this.ano;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  verificarAno(ano) {
    let bool = false;
    if (ano < 2000 || ano > 2100) {
      this.ano.descripcion = null;
      Swal.fire({ title: "Ingrese un año valido entre 2000 y 2100", timer: 2000, showConfirmButton: false });
      bool = false;
    } else {
      bool = true;
    }
  }

  verificarNumero(valor): boolean {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    if (tecla == 4) {
      return true;
    } else {
      var patron = /[0-9]/;
      var tecla_final = String.fromCharCode(tecla);
      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
        return false;
      } else {
        if (this.cantidadDigitos(this.ano.descripcion) == 4) {
          Swal.fire({ title: "El año no puede exceder de 4 digitos", timer: 2000, showConfirmButton: false });
          return false;
        } else {
          return true;
         }
      }
    }
  }

  cantidadDigitos(valor): number {
    var cont = 0;
    while (valor >= 1) {
      valor = valor / 10;
      cont++;
    }
    return cont;
  }
}
