import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Trabajador } from '../../../../../../models/Trabajador';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import { NuevoRemuDsctComponent } from '../nuevo-remu-dsct/nuevo-remu-dsct.component';
import { ConfirmarRemuDsctComponent } from '../confirmar-remu-dsct/confirmar-remu-dsct.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-remu-dsct',
  templateUrl: './gestion-remu-dsct.component.html',
  styles: []
})
export class GestionRemuDsctComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsTrabRemu', { static: true }) paginatorlsTrabRemu: MatPaginator;
  @ViewChild('paginatorlsTrabDsct', { static: true }) paginatorlsTrabDsct: MatPaginator;
  @ViewChild('paginatorlsTrabRemuInac', { static: true }) paginatorlsTrabRemuInac: MatPaginator;
  @ViewChild('paginatorlsTrabDsctInac', { static: true }) paginatorlsTrabDsctInac: MatPaginator;

  @Input() input_trab;

  trabajador: Trabajador = new Trabajador();
  lsTrabRemu = null;
  lsTrabRemuFiltro: any[] = [];
  lsTrabDsct = null;
  lsTrabDsctFiltro: any[] = [];
  lsTrabRemuInac = null;
  lsTrabRemuInacFiltro: any[] = [];
  lsTrabDsctInac = null;
  lsTrabDsctInacFiltro: any[] = [];
  modalRef: NgbModalRef

  displayedColumns: string[] = [
    'nombre',
    'tipo',
    // 'descripcion',
    'afectoDsct',
    'baja'
  ];

  displayed2Columns: string[] = [
    'nombre',
    'tipo',
    // 'descripcion',
    'baja'
  ];

  displayed3Columns: string[] = [
    'nombre',
    'tipo',
    // 'descripcion',
    'afectoDsct',
    'baja'
  ];

  displayed4Columns: string[] = [
    'nombre',
    'tipo',
    // 'descripcion',
    'baja'
  ];

  constructor(
    private activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private trabajadorService: TrabajadorService,
  ) { }

  ngOnInit() {
    this.trabajador = this.input_trab;
    this.listarTrabRemu(this.trabajador);
    this.listarTrabDsct(this.trabajador);  
    this.listarTrabRemuInac(this.trabajador);
    this.listarTrabDsctInac(this.trabajador);
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  close() {
    this.activemodal.close('Cancelado');
  }

  listarTrabRemu(trab) {
    this.trabajadorService.listarTrabRemu(trab).subscribe((resp: any) => {
      this.lsTrabRemuFiltro = resp.aaData;
      this.lsTrabRemu = new MatTableDataSource<any>(this.lsTrabRemuFiltro);
      this.lsTrabRemu.paginator = this.paginatorlsTrabRemu;
    })
  }

  listarTrabDsct(trab) {
    this.trabajadorService.listarTrabDsct(trab).subscribe((resp: any) => {
      this.lsTrabDsctFiltro = resp.aaData;
      this.lsTrabDsct = new MatTableDataSource<any>(this.lsTrabDsctFiltro);
      this.lsTrabDsct.paginator = this.paginatorlsTrabDsct;
    })
  }

  listarTrabRemuInac(trab) {
    this.trabajadorService.listarTrabRemuInac(trab).subscribe((resp: any) => {
      this.lsTrabRemuInacFiltro = resp.aaData;
      this.lsTrabRemuInac = new MatTableDataSource<any>(this.lsTrabRemuInacFiltro);
      this.lsTrabRemuInac.paginator = this.paginatorlsTrabRemuInac;
    })
  }

  listarTrabDsctInac(trab) {
    this.trabajadorService.listarTrabDsctInac(trab).subscribe((resp: any) => {
      this.lsTrabDsctInacFiltro = resp.aaData;
      this.lsTrabDsctInac = new MatTableDataSource<any>(this.lsTrabDsctInacFiltro);
      this.lsTrabDsctInac.paginator = this.paginatorlsTrabDsctInac;
    })
  }

  nuevoTrabRemu() {
    this.trabajador.accion = "R";
    this.openModal(this.trabajador);
  }

  nuevoTrabDsct() {debugger
    this.trabajador.accion = "D";
    this.openModal(this.trabajador);
  }

  darBajaRemu(trabRemu) {
    var tmp = Object.assign({}, trabRemu);
    tmp.accion = "DBR";
    this.openModal(tmp);
  }
  darBajaDsct(trabDsct) {
    var tmp = Object.assign({}, trabDsct);
    tmp.accion = "DBD";
    this.openModal(tmp);
  }

  activarRemu(trabRemu) {
    var tmp = Object.assign({}, trabRemu);
    tmp.accion = "AR";
    this.openModal(tmp);
  }

  activarDsct(trabDsct) {
    var tmp = Object.assign({}, trabDsct);
    tmp.accion = "AD";
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice.accion == "R" || indice.accion == "D") {
      this.modalRef = this.modalService.open(NuevoRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_trab = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.dismiss('refrescar');
      });

    } else {
      this.modalRef = this.modalService.open(ConfirmarRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_trabRemDsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
        this.activemodal.dismiss('refrescar');
      });
    }
  }

}
