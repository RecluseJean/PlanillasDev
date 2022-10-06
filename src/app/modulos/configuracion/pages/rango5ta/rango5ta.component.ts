import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'core-js/fn/array';
import {Rango5taService} from '../../services/rango5ta/rango5ta.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material';
import { LIMIT } from '../../../../config/config';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Empresa } from '../../../../models/Empresa';
import { ActualizarRango5taComponent } from './modals/actualizar-rango5ta/actualizar-rango5ta.component';
import { ConfirmarRango5taComponent } from './modals/confirmar-rango5ta/confirmar-rango5ta.component';

@Component({
  selector: 'app-rango5ta',
  templateUrl: './rango5ta.component.html',
  styles: []
})
export class Rango5taComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsRango5ta', { static: true }) paginatorlsRango5ta: MatPaginator;
  @ViewChild('paginatorlsRango5taInactiva', { static: true }) paginatorlsRango5taInactiva: MatPaginator;
  constructor(
    private modalService: NgbModal,
    public rango5taService: Rango5taService,
    public router: Router
  ) { }

  public lsRango5ta = null;
  public lsRango5taInactiva = null;
  public lsRango5taFiltro: any[] = [];
  public lsRango5taInactivaFiltro: any[] = [];
  public objEmpresa_final: any = null;

public rango5ta: any;
public empresa: Empresa = new Empresa();

  cerrar: boolean = false;
  modalRef: NgbModalRef;

  displayedColumns: string[] = [
    'descripcion',
    'porcentaje',
    'uitmin',
    'uitmax',
    'editar',
  ];


  itemsPerPage: number = LIMIT;
  total_registros = 0;
  pageEvent = PageEvent;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'))
    if (this.empresa != null) {
      this.listarRango5ta();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }


  public actualizarRango5ta(empresa_u) {debugger
    var empresa_tmp = Object.assign({}, empresa_u);
    empresa_tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(empresa_tmp);
  }


  public listarRango5ta() {
    this.rango5taService.listarRango5ta(this.empresa).subscribe(resp =>{
      if (resp.estado == 1) {
        this.lsRango5taFiltro = resp.aaData;
        this.lsRango5ta = new MatTableDataSource<Object>(this.lsRango5taFiltro);
        this.lsRango5ta.paginator = this.paginatorlsRango5ta;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  eliminarRango5ta(empresa_u) {
    var empresa_tmp = Object.assign({}, empresa_u);
    empresa_tmp.accion = Constantes.ELIMINAR;

    this.openModal(empresa_tmp);
  }

  public openModal(indice) {

    if (indice == null || indice.accion != "D") {
      this.modalRef = this.modalService.open(ActualizarRango5taComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_rango5ta = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {

      this.modalRef = this.modalService.open(ConfirmarRango5taComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_rango5ta = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }


  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsRango5ta.filter = filterValue.trim().toLowerCase();
  }

}
