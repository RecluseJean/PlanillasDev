import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoDepartamentoEmpresaComponent } from './modals/nuevo-departamentoEmpresa/nuevo-departamento-empresa.component';
import { Empresa } from '../../../../models/Empresa';
import { DepartamentoEmpresa } from '../../../../models/DepartamentoEmpresa';
import { Router } from '@angular/router';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevoDepartamentoEmpresaComponent } from "./modals/confirmar-nuevo-departamentoEmpresa/confirmar-nuevo-departamento-empresa.component";
import { DepartamentoEmpresaService } from '../../services/departamentoEmpresa/departamento-empresa.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-departamento-empresa',
  templateUrl: './departamento-empresa.component.html',
  styles: []
})
export class DepartamentoEmpresaComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private modalService: NgbModal, private departamentoEmpresaService: DepartamentoEmpresaService, public router: Router
  ) { }

  displayedColumns: string[] = [
    'nombre',
    'gerente',
    'editar', 
    'eliminar'
  ];
  public empresa: Empresa = new Empresa();
  public listDepEmp: any[] = [];
  public departamentoEmpresa: DepartamentoEmpresa = new DepartamentoEmpresa();
  modalRef: NgbModalRef;
  pA: number = 1;
  numItem = Constantes.numeroItem;
  public data=null;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarDepartamentoEmpresa();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  public listarDepartamentoEmpresa() {
    this.departamentoEmpresaService.listarDepEmp(this.empresa).subscribe((resp: any) => {
      this.listDepEmp = resp.aaData;
      this.data=new MatTableDataSource<Object>(this.listDepEmp);
      this.data.paginator = this.paginator;
      this.listDepEmp.forEach((depEmp: DepartamentoEmpresa) => {
        if (depEmp.gerente != null) {
          depEmp.gerente.nombres = depEmp.gerente.apePater + " " + depEmp.gerente.apeMater + " " + depEmp.gerente.nombres;
        }
      })
    });
  }
  applyFilter(event: Event) {debugger
		const filterValue = (event.target as HTMLInputElement).value;
		this.data.filter = filterValue.trim().toLowerCase();
	
		if (this.data.paginator) {
		  this.data.paginator.firstPage();
		}
	  }
  public crearDepartamentoEmpresa() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarDepartamentoEmpresa(departamentoEmpresa_u) {
    var tmp_DepEmp = Object.assign({}, departamentoEmpresa_u);
    tmp_DepEmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_DepEmp);
  }

  eliminarDepartamentoEmpresa(departamentoEmpresa_d) {
    var tmp_DepEmp = Object.assign({}, departamentoEmpresa_d);
    tmp_DepEmp.accion = Constantes.ELIMINAR;

    this.openModal(tmp_DepEmp);
  }

  public openModal(indice) {

    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(NuevoDepartamentoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_departamentoEmpresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(ConfirmarNuevoDepartamentoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_departamentoEmpresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}
