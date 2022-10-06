import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoPuestoAreaEmpresaComponent } from './modals/nuevo-puesto-area-empresa/nuevo-puesto-area-empresa.component';
import { Empresa } from '../../../../models/Empresa';
import { PuestoAreaEmpresa } from '../../../../models/PuestoAreaEmpresa';
import { Router } from '@angular/router';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoPuestoAreaEmpresaComponent } from "./modals/confirmar-nuevo-puesto-area-empresa/confirmar-nuevo-puesto-area-empresa.component";
import { PuestoAreaEmpresaService } from '../../services/puesto-area-empresa/puesto-area-empresa.service';
import { ProyeccionPuesto } from '../../../../models/ProyeccionPuesto';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-puesto-area-empresa',
  templateUrl: './puesto-area-empresa.component.html',
  styles: []
})
export class PuestoAreaEmpresaComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private modalService: NgbModal,
    private puestoAreaEmpresaService: PuestoAreaEmpresaService,
    public router: Router
  ) { }

  displayedColumns: string[] = [
    'nombre',
    'area',
    'categoria',
    'proyeccion',
    'editar',
    'eliminar'
  ];

  modalRef: NgbModalRef;
  public empresa: Empresa = new Empresa();
  lsProyeccion: any[] = [];
  pA: number = 1;
  numItem = Constantes.numeroItem;
  data = null;

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
      this.listarProyeccion();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarProyeccion() {
    this.puestoAreaEmpresaService.listarProyeccionPuesto(this.empresa).subscribe((resp: any) => {
      this.lsProyeccion = resp.aaData;
      this.data = new MatTableDataSource<Object>(this.lsProyeccion);
      this.data.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    this.lsProyeccion.map((x) => {
      x.categoria = x.puesto.scategoria;
      x.nom_proyeccion = x.puesto.snombre;
      x.nom_area = x.puesto.areaDepartamentoEmpresa.snombre;

    });
    this.data = new MatTableDataSource<Object>(this.lsProyeccion);
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
  crearProyeccion() {
    let indice = null;
    this.openModal(indice);
  }

  modifificarProyeccion(proyeccion) {
    var tmp = Object.assign({}, proyeccion);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarProyeccion(proyeccion) {
    var tmp = Object.assign({}, proyeccion);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(NuevoPuestoAreaEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_proyeccion = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(ConfirmarNuevoPuestoAreaEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_puestoDto = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }

}
