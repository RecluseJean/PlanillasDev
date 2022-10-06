import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RemuneracionesService } from '../../services/remuneraciones/remuneraciones.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../../../models/Empresa';
import Constantes from '../../../../models/Constantes';
import { NuevaRemuneracionComponent } from './modals/nueva-remuneracion/nueva-remuneracion.component';
import { NuevaRemuneracionConfirmarComponent } from './modals/nueva-remuneracion-confirmar/nueva-remuneracion-confirmar.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TxtComponent } from './modals/txt/txt.component';

@Component({
  selector: 'app-remuneraciones',
  templateUrl: './remuneraciones.component.html',
  styles: []
})

export class RemuneracionesComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsRemuneracion', { static: true }) paginatorlsRemuneracion: MatPaginator;
  @ViewChild('paginatorlsRemuneracionInac', { static: true }) paginatorlsRemuneracionInac: MatPaginator;

  empresa: Empresa = new Empresa();
  lsRemuneracion = null;
  lsRemuneracionFilter: any[] = [];
  lsRemuneracionInac = null;
  lsRemuneracionInacFilter: any[] = [];
  // dataRemuneracion = null;
  // dataRemuneracionInac = null;

  modalRef: NgbModalRef;
  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  activoActive = "";
  inactivoActive = "";

  displayedColumns: string[] = [
    'nombre',
    'tipoRemuneracion',
    'descripcion',
    'afectoDsct',
    'archivo',
    'editar',
    'eliminar'
  ];

  constructor(
    private remuneracionService: RemuneracionesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.gestionarTabs();
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarRem();
      this.listarRemInac();
    }
  }
  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarRem() {
    this.remuneracionService.listar(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRemuneracionFilter = resp.aaData;
        this.lsRemuneracion = new MatTableDataSource<Object>(this.lsRemuneracionFilter);
        this.lsRemuneracion.paginator = this.paginatorlsRemuneracion;
      }
    })
  }

  listarRemInac() {
    this.remuneracionService.listarInac(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsRemuneracionInacFilter = resp.aaData;
        this.lsRemuneracionInac = new MatTableDataSource<Object>(this.lsRemuneracionInacFilter);
        this.lsRemuneracionInac.paginator = this.paginatorlsRemuneracionInac;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsRemuneracion.filter = filterValue.trim().toLowerCase();

    if (this.lsRemuneracion.paginator) {
      this.lsRemuneracion.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsRemuneracionInac.filter = filterValue.trim().toLowerCase();
    if (this.lsRemuneracionInac.paginator) {
      this.lsRemuneracionInac.paginator.firstPage();
    }
  }

  registrarRem() {
    let indice = null;
    this.openModal(indice);
  }

  modificarRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  darBajaRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  activarRem(rem) {
    var tmp = Object.assign({}, rem);
    tmp.accion = "A";
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevaRemuneracionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_rem = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevaRemuneracionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-mdC'
        })
      this.modalRef.componentInstance.input_rem = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalRef = this.modalService.open(NuevaRemuneracionConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_rem = indice;
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

  generaArchivo(element){
    const indice = element;
    this.openModalTxt(indice);
  }

  openModalTxt(indice) {
    this.modalRef = this.modalService.open(TxtComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: 'modalMD'
    });
    this.modalRef.componentInstance.input_remuneracion = indice;
    this.modalRef.result.then(
      result => { },
      reason => { }
    );
  }
}
