import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CentroCostosService } from '../../services/centro-costos/centro-costos.service';
import Swal from 'sweetalert2';
import { ConfirmarNuevoCentroCostosComponent } from './modals/confirmar-nuevo-centro-costos/confirmar-nuevo-centro-costos.component';
import { NuevoCentroCostosComponent } from './modals/nuevo-centro-costos/nuevo-centro-costos.component';
import Constantes from '../../../../models/Constantes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-centro-costos',
  templateUrl: './centro-costos.component.html',
  styles: []
})
export class CentroCostosComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    public centroCostosService: CentroCostosService,
    private modalService: NgbModal,
    private router: Router
  ) { }
  displayedColumns: string[] = [
    'nombre',
    'editar',
    'eliminar'
  ];
  lsCentroCostos= null;
  lsCentroCostosFilter: any [] = [];
  public empresa: Empresa = new Empresa();
  pA:number = 1;
  numItem = Constantes.numeroItem;

  ngOnInit() {
    var tmp : any = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    if(tmp!=null){
      this.empresa.idEmpresa=tmp.idEmpresa;
      this.listarcentroCostosXEmpresa();
    }
  }

  public listarcentroCostosXEmpresa(){

    var empresa={
      "idEmpresa": this.empresa.idEmpresa
    }
    this.centroCostosService.listarCentroCostosXEmpresa(empresa).subscribe(resp => {
      if(resp.estado==1){
        this.lsCentroCostosFilter = resp.aaData;
        this.lsCentroCostos = new MatTableDataSource<Object>(this.lsCentroCostosFilter);
        this.lsCentroCostos.paginator = this.paginator;
        // this.lsCentroCostos=resp.aaData;
      }else{
        Swal.fire('Error en la transaccion => listarcentroCostosXEmpresa()',resp.msg , 'error');
      }
    });
  }

  public nuevoCentroCostos(){
    let indice = null;
    this.openModal(indice)
  }

  public actualizarCentroCostos(cenCos_u){
    var tmp_cenCos=Object.assign({},cenCos_u);
    tmp_cenCos.accion=Constantes.ACTUALIZAR;
    this.openModal(tmp_cenCos);
  }

  eliminarCentroCostos(cenCos_d){
    var tmp_cenCos=Object.assign({},cenCos_d);
    tmp_cenCos.accion=Constantes.ELIMINAR;
    this.openModal(tmp_cenCos);
  }

  public openModal(indice) {
    if (indice == null  || indice.accion!="D"){
      const modalRef = this.modalService.open(NuevoCentroCostosComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        modalRef.componentInstance.input_centro_costos=indice;
        modalRef.result.then((result)=>{
        }, (reason) => {
        });
      } else{

        const modalRef = this.modalService.open(ConfirmarNuevoCentroCostosComponent,
          {
            backdrop: 'static',
            keyboard: false,
            size: 'sm'
          }
        );
        modalRef.componentInstance.input_centro_costos=indice;
        modalRef.result.then((result) => {
       }, (reason) => {
       });

      }
  }

  applyFilter(event: Event) {debugger
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsCentroCostos.filter = filterValue.trim().toLowerCase();
  }
}
