import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { PermisoService } from '../../../../services/permisos/permiso.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import { NuevoPermisoComponent } from '../nuevo-permiso/nuevo-permiso.component';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-permisos',
  templateUrl: './mostrar-permisos.component.html',
  styles: []
})
export class MostrarPermisoComponent implements OnInit, OnDestroy {

  @Input() input_trabajador;
  @Input() input_ano;
  @Input() input_mes;

  constructor(
    public permisoService: PermisoService,
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
  ) { }

  objTrabajadorContrato: any;
  lsTrabPermisos: any = [];
  ano: Año = new Año();
  mes: Mes = new Mes();
  modalRef: NgbModalRef;

  ngOnInit() {
    this.objTrabajadorContrato = this.input_trabajador;
    this.ano = this.input_ano;
    this.mes = this.input_mes;
    this.listarPermisos();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarPermisos() {
    this.permisoService.listarPermisosPorTrabajador(this.objTrabajadorContrato.trabajador, this.ano, this.mes).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabPermisos = resp.aaData;
      }
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  actualizarPermiso(permiso) {
    this.openModal(this.objTrabajadorContrato, permiso);
  }


  nuevoPermiso() {
    var tmp = Object.assign({}, this.objTrabajadorContrato.trabajador);
    tmp.accion = Constantes.REGISTRAR;
    this.openModal(tmp, null);
  }

  public openModal(trabajador, permiso) {

    this.modalRef = this.modalService.open(NuevoPermisoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_trabajador = trabajador;
    this.modalRef.componentInstance.input_permiso = permiso;
    this.modalRef.result.then((result) => {
      this.activemodal.close();
    });
  }

  eliminarPermiso(permiso) {
    var tmp = Object.assign({}, permiso);
    tmp.accion = 'P'
    this.modalRef = this.modalService.open(ConfirmarEliminarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_accion = tmp;
    this.modalRef.result.then((result) => {
      this.activemodal.close();
    });
  }

  descargarArchivo(permiso) {
    const dirArchivo = permiso.nombreArchivo;
    this.permisoService.decargarArchivo(dirArchivo).subscribe((resp: any) => {
      if (resp != null) {
        var file = new Blob([resp], { type: 'file' });
        saveAs(file, dirArchivo);
        Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
      } else {
        Swal.fire(Constantes.ERROR, "Error al descargar Archivo", 'error');
      }
    });
  }
}
