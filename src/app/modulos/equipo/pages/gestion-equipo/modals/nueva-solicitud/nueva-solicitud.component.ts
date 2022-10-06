import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestionEquipoService } from '../../../../services/gestion-equipo/gestion-equipo.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from '../../../../../../models/Solicitud';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../../../models/Empresa';
import { Trabajador } from '../../../../../../models/Trabajador';
import { ConfirmarNuevaSolicitudComponent } from '../confirmar-nueva-solicitud/confirmar-nueva-solicitud.component';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styles: []
})
export class NuevaSolicitudComponent implements OnInit, OnDestroy {


  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public gestionEquipoService: GestionEquipoService) { }

  empresa: Empresa = new Empresa();
  trabajador: any = new Trabajador();
  token: any;
  solicitud: any = new Solicitud();
  lsPuesto: any[] = [];
  idPuesto: number;

  tecla: any;

  modalRef: NgbModalRef;


  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    //this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;
    this.token = JSON.parse(localStorage.getItem("InfoToken"));
    this.listarPuesto();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarPuesto() {
    this.gestionEquipoService.listarPuestoAreaEmp(this.empresa).subscribe((resp: any) => {
      this.lsPuesto = resp.aaData;
    })
  }

  registrar() {
    var solicitudDto = {
      "solicitud": this.solicitud,
      "puesto": {
        "iidPuesto": this.idPuesto
      },
      //"trabajador": this.trabajador
      "usuario": {
        "idUsuario": this.token.id_usuario
      }
    }
    this.openModalConfirmar(solicitudDto);
  }

  openModalConfirmar(indice) {

    this.modalRef = this.modalService.open(ConfirmarNuevaSolicitudComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_solicitudDto = indice;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.close();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  verificarNumero(valor) {
    this.tecla = (document.all) ? valor.keyCode : valor.which;
    var patron = /[0.0-9.9]/;
    var tecla_final = String.fromCharCode(this.tecla);
    if (!patron.test(tecla_final)) {
      Swal.fire({ title: "Valor inválido, ingrese solo números del 0 al 9", timer: 1500, showConfirmButton: false });
      return false;
    }
  }

}
