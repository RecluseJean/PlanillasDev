import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { Trabajador } from '../../../../models/Trabajador';
import { Empresa } from '../../../../models/Empresa';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DerechoHabientesRelacionadosComponent } from './modals/derecho-habientes-relacionados/derecho-habientes-relacionados.component';
import { DerechoHabiente } from '../../../../models/Derecho-Habiente';
import { NuevoDerechoHabienteComponent } from './modals/nuevo-derecho-habiente/nuevo-derecho-habiente.component';
import Constantes from '../../../../models/Constantes';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-derecho-habientes',
  templateUrl: './derecho-habientes.component.html',
  styles: []
})
export class DerechoHabientesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public modalService: NgbModal,
    private trabajadorService: TrabajadorService) { }

  empresa: Empresa = new Empresa();
  derechoH: DerechoHabiente = new DerechoHabiente;

  lsTrabajador = null;
  lsTrabajadorFilter: any[] = [];

  modalRef: NgbModalRef

  displayedColumns: string[] = [
    'nrodoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    'estado',
    'ver',
    'aniadir'
  ];

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

    if (this.empresa != null) {
      this.listarTrabXEmp()
    }
  }

  applyFilter(event: Event) {
    this.lsTrabajadorFilter.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;

    });
    this.lsTrabajador = new MatTableDataSource<Object>(this.lsTrabajadorFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabajador.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabajador.paginator) {
      this.lsTrabajador.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTrabXEmp() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      this.lsTrabajadorFilter = resp.aaData;
      let respTrabajadorxComprobante: Object[] = [];
      respTrabajadorxComprobante = resp.aaData;
      this.lsTrabajador = new MatTableDataSource<Object>(this.lsTrabajadorFilter);
      this.lsTrabajador.paginator = this.paginator;
    })
  }

  verDerHab(trabajador) {
    var tmp_trab = Object.assign({}, trabajador);
    tmp_trab.accion = "V";
    this.openModal(tmp_trab);
  }

  regisDerHab(trabajador) {
    var tmp_trab = Object.assign({}, trabajador);
    tmp_trab.accion = "R";
    this.openModal(tmp_trab);
  }

  openModal(indice) {
    if (indice.accion == "V") {
      this.modalRef = this.modalService.open(DerechoHabientesRelacionadosComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(NuevoDerechoHabienteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdB'
        })
      this.modalRef.componentInstance.input_trabajador = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}
