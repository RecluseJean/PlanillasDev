import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { TipoPlanillaService } from '../../services/tipo-planilla/tipo-planilla.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTipoPlanillaComponent } from './modals/nuevo-tipo-planilla/nuevo-tipo-planilla.component';
import { PerfilesPlanillaComponent } from './modals/perfiles-planilla/perfiles-planilla.component';
import Constantes from '../../../../models/Constantes';
import { Año } from "../../../../models/Año";
import { Mes } from "../../../../models/Mes";
import { ConfirmarNuevoTipoPlanillaComponent } from './modals/confirmar-nuevo-tipo-planilla/confirmar-nuevo-tipo-planilla.component';
import { TrabajadoresPlanillaComponent } from './modals/trabajadores-planilla/trabajadores-planilla.component';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-tipo-planilla',
  templateUrl: './tipo-planilla.component.html',
  styles: []
})
export class TipoPlanillaComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  empresa: Empresa = new Empresa();
  ano: Año = new Año();
  mes: Mes = new Mes();
  lstipoPlanilla: any[] = [];
  modalRef: NgbModalRef;
  namePerfil: String = "";
  pA: number = 1;
  numItem = Constantes.numeroItem;

  displayedColumns: string[] = [
    'nombre',
    'categoria',
    'perfiles',
    'trabajadores',
    'asistencias',
    'editar', 
    'eliminar'
  ];
  public data=null;

  constructor(
    public tipoPlanillaService: TipoPlanillaService,
    public modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    if (this.empresa != null) {
      this.listar();
    }
  }

  listar() {
    this.tipoPlanillaService.listar(this.empresa).subscribe((resp: any) => {
      this.lstipoPlanilla = resp.aaData;
      this.data = new MatTableDataSource<Object>(this.lstipoPlanilla);
      this.data.paginator = this.paginator;
      
    })
  }
  applyFilter(event: Event) {debugger
		const filterValue = (event.target as HTMLInputElement).value;
		this.data.filter = filterValue.trim().toLowerCase();
	
		if (this.data.paginator) {
		  this.data.paginator.firstPage();
		}
	  }
  registrar() {
    const indice = null;
    this.openModal(indice);
  }

  generarAsistenciaMasiva() {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genAsistenciaMasiva, "info");
    } else {
      var empresaDTO = {
        "empresa": this.empresa,
        "pdoAno": this.ano,
        "pdoMes": this.mes,
        "accion":"AM"
      }
      this.openModal(empresaDTO);
    }
  }

  generarAsistencia(tipoPlanilla) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genAsistencia, "info");
    } else {
      var empresaDTO = {
        "empresa": this.empresa,
        "pdoAno": this.ano,
        "pdoMes": this.mes,
        "tipoPlanilla": tipoPlanilla,
        "accion":"AS"
      }
      this.openModal(empresaDTO);
    }
  }

  asignarPerfiles(indice) {
    let tmp = Object.assign({}, indice);
    tmp.accion = "P";
    this.openModal(tmp);
  }

  asignarTrabajadores(tipPlan) {
    let tmp = Object.assign({}, tipPlan);
    tmp.accion = "T";
    this.openModal(tmp);
  }

  modificar(tipPlan) {
    var tmp = Object.assign({}, tipPlan);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminar(tipPlan) {
    var tmp = Object.assign({}, tipPlan);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null || indice.accion == "U") {
      this.modalRef = this.modalService.open(NuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_tipPlan = indice;
    } else if (indice.accion == "P") {
      this.modalRef = this.modalService.open(PerfilesPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_tipPlan = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if (indice.accion == "T") {
      this.modalRef = this.modalService.open(TrabajadoresPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_tipPlan = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if(indice.accion == "AM" || indice.accion == "AS"){
      this.modalRef = this.modalService.open(ConfirmarNuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_empresaDTO = indice;

    } else {
      this.modalRef = this.modalService.open(ConfirmarNuevoTipoPlanillaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_tipPlan = indice;
    }

  }

}
