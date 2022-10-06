import { Component, OnInit, Input } from '@angular/core';
import { TipoPermiso } from '../../../../../../models/TipoPermiso';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../../../models/Empresa';
import { NuevoTipoPermisoConfirmarComponent } from '../nuevo-permiso-confirmar/nuevo-permiso-confirmar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-permiso',
  templateUrl: './nuevo-permiso.component.html',
  styles: []
})
export class NuevoTipoPermisoComponent implements OnInit {

  @Input() input_permiso;
  permiso: TipoPermiso = new TipoPermiso();
  lsEstado: any = [];
  empresa: Empresa = new Empresa();

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.iniciarDatos();
    if (this.input_permiso != null) {
      this.permiso = this.input_permiso;
    }
  }

  close() {
    this.activeModal.dismiss('Cancelado');
  }

  confirmarNuevoTipoPermiso() {
    this.openModal();
  }

  openModal() {
    const modalRef = this.modalService.open(NuevoTipoPermisoConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_permiso = this.permiso;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activeModal.close();
    });
  }

  iniciarDatos() {
    this.lsEstado = Constantes.ESTADO;
    this.permiso.accion = Constantes.REGISTRAR;
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
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
