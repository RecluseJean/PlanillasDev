import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import Constantes from '../../../../models/Constantes';
import { NuevaSugerenciaComponent } from './modals/nueva-sugerencia/nueva-sugerencia.component';
import { BuzonSugerenciaService } from '../../services/buzon-sugerencia/buzon-sugerencia.service';



@Component({
  selector: 'app-buzon-sugerencia',
  templateUrl: './buzon-sugerencia.component.html',
  styles: []
})
export class BuzonSugerenciaComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('paginatorlsSugerencias', { static: true }) paginatorlsSugerencias: MatPaginator;

  constructor(
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public buzonSugerenciaService: BuzonSugerenciaService
   
  ) { }

  modalRef: NgbModalRef;
  activoActive = "";
  inactivoActive = "";
  defaultTab : any;
  activoShow = "";
  inactivoShow = "";

  lsSugerencias=null;

  public listSugeEmp: Array<any> = [];


  displayedColumns: string[] = [
    'apenom',
    'asunto',
    'puesto',
    'fech_pub',
    'editar', 
    'eliminar'
  ];

  ngOnInit() {
    var tmp: any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (tmp != null) {
      this.empresa.idEmpresa = tmp.idEmpresa;
      this.listarSugerenciasEmpresa();
      
    }
  }


  public listarSugerenciasEmpresa() {
    var empresa = {
      "idEmpresa": this.empresa.idEmpresa
    }
    this.buzonSugerenciaService.listarSugerenciasEmp(empresa).subscribe((resp: any) => {
      this.listSugeEmp = resp.aaData;
      this.lsSugerencias=new MatTableDataSource<Object>(this.listSugeEmp);
      this.lsSugerencias.paginator = this.paginatorlsSugerencias;

      console.log('lsSugerenciasEmpresa', resp.aaData)

    });
    return this.listSugeEmp;
  }


  public actualizarDepartamentoEmpresa(departamentoEmpresa_u) {

  }

  eliminarDepartamentoEmpresa(departamentoEmpresa_d) {

  }

  public empresa: Empresa = new Empresa();
  data=null;

 

  applyFilter(event: Event) {debugger
		const filterValue = (event.target as HTMLInputElement).value;
		this.data.filter = filterValue.trim().toLowerCase();
	
		if (this.data.paginator) {
		  this.data.paginator.firstPage();
		}
	  }

    nuevaSugerencia() {debugger
      let indice = "S";
      this.openModal(indice);
    }
  
    public openModal(indice) {
  
      switch (indice) {
 
  
           case 'S': this.modalRef = this.modalService.open(NuevaSugerenciaComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'lg'
            }
          );
            this.modalRef.componentInstance.input_trabajador_final = indice;
           break;
  
      }
    }


    cambiarTabs(valor){
      this.defaultTab.pagTrabajador.estado = valor;
      localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
    }

 


}
