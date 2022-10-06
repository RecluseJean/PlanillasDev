import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DescuentosService } from '../../services/descuentos/descuentos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import Constantes from '../../../../models/Constantes';
import { NuevoDescuentoComponent } from './modals/nuevo-descuento/nuevo-descuento.component';
import { NuevoDescuentoConfirmarComponent } from './modals/nuevo-descuento-confirmar/nuevo-descuento-confirmar.component';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { LIMIT } from '../../../../config/config';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styles: []
})
export class DescuentosComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsDsct', { static: true }) paginatorlsDsct: MatPaginator;
  @ViewChild('paginatorlsDsctInac', { static: true }) paginatorlsDsctInac: MatPaginator;

  lsDsct = null;
  lsDsctFilter: any[] = [];
  lsDsctInac = null;
  lsDsctInacFilter: any[] = [];

  empresa: Empresa = new Empresa();
  modalRef: NgbModalRef;
  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  activoActive = "";
  inactivoActive = "";

  displayedColumns: string[] = [
    'nombre',
    'tipo',
    'editar',
    'eliminar'
  ];
  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;

  constructor(
    private descuentoService: DescuentosService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gestionarTabs();
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarDsct();
      this.listarDsctInac();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarDsct() {
    this.descuentoService.listarDsct(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDsctFilter = resp.aaData;
        this.lsDsct = new MatTableDataSource<Object>(this.lsDsctFilter);
        this.lsDsct.paginator = this.paginatorlsDsct;
      }
    })
  }

  listarDsctInac() {
    this.descuentoService.listarDsctInac(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDsctInacFilter = resp.aaData;
        this.lsDsctInac = new MatTableDataSource<Object>(this.lsDsctInacFilter);
        this.lsDsctInac.paginator = this.paginatorlsDsctInac;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsDsct.filter = filterValue.trim().toLowerCase();

    if (this.lsDsct.paginator) {
      this.lsDsct.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsDsctInac.filter = filterValue.trim().toLowerCase();

    if (this.lsDsctInac.paginator) {
      this.lsDsctInac.paginator.firstPage();
    }
  }

  registrarDsct() {
    let indice = null;
    this.openModal(indice);
  }

  modificarDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  darBajaDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  activarDsct(dsct) {
    var tmp = Object.assign({}, dsct);
    tmp.accion = "A";
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevoDescuentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevoDescuentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(NuevoDescuentoConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_dsct = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }
  gestionarTabs(){
    this.defaultTab = JSON.parse(localStorage.getItem('defaultTabs'));
    if (this.defaultTab.pagEmpresa.estado) {
      this.activoActive = this.defaultTab.active
      this.activoShow =  this.defaultTab.descripcion;
      this.inactivoActive = "";
      this.inactivoShow = "";
    } else {
      this.inactivoActive = this.defaultTab.active
      this.inactivoShow = this.defaultTab.descripcion;
      this.activoActive = "";
      this.activoShow = "";
    }
  }

  cambiarTabs(valor){
    this.defaultTab.pagEmpresa.estado = valor;
    localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
  }
}
