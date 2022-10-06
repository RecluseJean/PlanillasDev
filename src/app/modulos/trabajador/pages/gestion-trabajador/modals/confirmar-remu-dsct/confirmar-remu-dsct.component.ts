import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TrabajadorService } from '../../../../services/trabajador/trabajador.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Trabajador } from '../../../../../../models/Trabajador';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-confirmar-remu-dsct',
  templateUrl: './confirmar-remu-dsct.component.html',
  styles: []
})
export class ConfirmarRemuDsctComponent implements OnInit {
  @ViewChild('paginatorlsTrabRemu', { static: true }) paginatorlsTrabRemu: MatPaginator;
  @ViewChild('paginatorlsTrabDsct', { static: true }) paginatorlsTrabDsct: MatPaginator;

  trabajador: Trabajador = new Trabajador();

  lsTrabRemuFiltro: any[] = [];
  lsTrabDsctFiltro: any[] = [];
  lsTrabRemu = null;
  lsTrabDsct = null;

  @Input() input_trabRemDsct;

  objTrabRemu: any = null;
  objTrabDsct: any = null;

  constructor(
    public activemodal: NgbActiveModal,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {

    if (this.input_trabRemDsct.accion == "DBR" || this.input_trabRemDsct.accion == "AR") {
      this.objTrabRemu = this.input_trabRemDsct;
      this.listarTrabRemu(this.trabajador);
    } else if (this.input_trabRemDsct.accion == "DBD" || this.input_trabRemDsct.accion == "AD") {
      this.objTrabDsct = this.input_trabRemDsct;
      this.listarTrabDsct(this.trabajador);
    }
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

  close() {
    this.activemodal.close('Cancelado');
  }

  accion() {
    if (this.objTrabRemu != null) {
      if (this.objTrabRemu.accion == "DBR") {
        this.darBajaRemu();
      } else {
        this.activarRemu();
      }
      this.listarTrabRemu(this.trabajador);
    } else {
      if (this.objTrabDsct.accion == "DBD") {
        this.darBajaDsct();
      } else {
        this.activarDsct();
      }
      this.listarTrabDsct(this.trabajador);
    }
  }

  darBajaRemu() {
    this.trabajadorService.darBajaRemu(this.objTrabRemu).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  darBajaDsct() {
    this.trabajadorService.darBajaDsct(this.objTrabDsct).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  activarRemu() {
    this.trabajadorService.activarRemu(this.objTrabRemu).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  activarDsct() {
    this.trabajadorService.activarDsct(this.objTrabDsct).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

}
