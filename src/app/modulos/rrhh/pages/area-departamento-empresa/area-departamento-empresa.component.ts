import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevaAreaDepartamentoEmpresaComponent } from './modals/nueva-area-departamento-empresa/nueva-area-departamento-empresa.component';
import { Empresa } from '../../../../models/Empresa';
import { AreaDepartamentoEmpresa } from '../../../../models/AreaDepartamentoEmpresa';
import { Router } from '@angular/router';
import Constantes from '../../../../models/Constantes';
import { ConfirmarNuevaAreaDepartamentoEmpresaComponent } from "./modals/confirmar-nueva-area-departamento-empresa/confirmar-nueva-area-departamento-empresa.component";
import { AreaDepartamentoEmpresaService } from '../../services/area-departamento-empresa/area-departamento-empresa.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-area-departamento-empresa',
  templateUrl: './area-departamento-empresa.component.html',
  styles: []
})
export class AreaDepartamentoEmpresaComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private modalService: NgbModal,
    private areaDepartamentoEmpresaService: AreaDepartamentoEmpresaService,
    public router: Router
  ) { }
  displayedColumns: string[] = [
    'nombre',
    'depa',
    'editar', 
    'eliminar'
  ];
  public empresa: Empresa = new Empresa();
  public listAreaDepEmp: Array<any> = [];
  public areaDepartamentoEmpresa: AreaDepartamentoEmpresa = new AreaDepartamentoEmpresa();
  modalRef: NgbModalRef;
  pA: number = 1;
  numItem = Constantes.numeroItem;
  data=null;

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
      this.listarAreaDepartamentoEmpresa();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  public listarAreaDepartamentoEmpresa() {
    var empresa = {
      "idEmpresa": this.empresa.idEmpresa
    }
    this.areaDepartamentoEmpresaService.listarAreaDepEmp(empresa).subscribe((resp: any) => {
      this.listAreaDepEmp = resp.aaData;
      this.data=new MatTableDataSource<Object>(this.listAreaDepEmp);
      this.data.paginator = this.paginator;

    });
    return this.listAreaDepEmp;
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

  public crearAreaDepartamentoEmpresa() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarAreaDepartamentoEmpresa(areaDepartamentoEmpresa_u) {
    var tmp_AreaDepEmp = Object.assign({}, areaDepartamentoEmpresa_u);
    tmp_AreaDepEmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_AreaDepEmp);
  }

  eliminarAreaDepartamentoEmpresa(areaDepartamentoEmpresa_d) {
    var tmp_AreaDepEmp = Object.assign({}, areaDepartamentoEmpresa_d);
    tmp_AreaDepEmp.accion = Constantes.ELIMINAR;

    this.openModal(tmp_AreaDepEmp);
  }

  public openModal(indice) {

    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(NuevaAreaDepartamentoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_areaDepartamentoEmpresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(ConfirmarNuevaAreaDepartamentoEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_areaDepartamentoEmpresa = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }
}
