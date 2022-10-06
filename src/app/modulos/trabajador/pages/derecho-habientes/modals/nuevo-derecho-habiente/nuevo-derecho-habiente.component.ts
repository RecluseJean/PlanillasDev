import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DerechoHabiente } from '../../../../../../models/Derecho-Habiente';
import Constantes from '../../../../../../models/Constantes';
import { Trabajador } from '../../../../../../models/Trabajador';
import { ConfirmarDerechoHabienteComponent } from '../confirmar-derecho-habiente/confirmar-derecho-habiente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-derecho-habiente',
  templateUrl: './nuevo-derecho-habiente.component.html',
  styles: []
})
export class NuevoDerechoHabienteComponent implements OnInit {

  @Input() input_trabajador;

  derechoHabiente: DerechoHabiente = new DerechoHabiente();
  trabajador: any = new Trabajador();
  lsderHab: Array<any>= Constantes.DerechoHab;
  modalRef:NgbModalRef;
  
  constructor(
    public activemodal : NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.trabajador = this.input_trabajador;
  }

  public openModalConfirmar(){
    this.derechoHabiente.accion=Constantes.REGISTRAR;
    this.modalRef = this.modalService.open(ConfirmarDerechoHabienteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_derHab=this.derechoHabiente;
    this.modalRef.componentInstance.input_trabajador=this.trabajador;
    this.modalRef.result.then((result) => {
   }, (reason) => {
      this.activemodal.close();
   });
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  verificarNumero(valor) {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
      return false;
    }
  }

}
