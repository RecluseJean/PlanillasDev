import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Año } from '../../../../../../models/Año';
import { Mes } from '../../../../../../models/Mes';
import { FaltaService } from '../../../../services/faltas/faltas.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import { NuevaFaltaComponent } from '../nueva-falta/nueva-falta.component';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-faltas',
  templateUrl: './mostrar-faltas.component.html',
  styles: []
})
export class MostrarFaltasComponent implements OnInit, OnDestroy {

  @Input() input_trabajador;
  @Input() input_ano;
  @Input() input_mes;

  objTrabajadorContrato: any;
  lsTrabFaltas: any = [];
  ano: Año = new Año();
  mes: Mes = new Mes();
  modalRef: NgbModalRef;

  constructor(
    public faltaService: FaltaService,
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.objTrabajadorContrato = this.input_trabajador;
    this.ano = this.input_ano;
    this.mes = this.input_mes;
    this.listarFaltas();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarFaltas() {
    this.faltaService.listarFaltasPorTrabajador(this.objTrabajadorContrato.trabajador, this.ano, this.mes).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabFaltas = resp.aaData;
      }
    })
  }

  nuevaFalta() {
    var tmp = Object.assign({}, this.objTrabajadorContrato.trabajador);
    tmp.accion = Constantes.REGISTRAR;
    this.openModal(tmp, null);
  }

  public openModal(trabajador, falta) {

    this.modalRef = this.modalService.open(NuevaFaltaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_trabajador = trabajador;
    this.modalRef.componentInstance.input_falta = falta;
    this.modalRef.result.then((result) => {
      this.activemodal.close();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  actualizarFalta(falta) {
    this.openModal(null, falta);
  }

  eliminarFalta(falta) {
    var tmp = Object.assign({}, falta);
    tmp.accion = 'F'
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

  descargarArchivo(falta) {
    const dirArchivo = falta.nombreArchivo;
    this.faltaService.decargarArchivo(dirArchivo).subscribe((resp: any) => {
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
