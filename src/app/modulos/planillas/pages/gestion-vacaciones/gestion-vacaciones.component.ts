import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from '../../../trabajador/services/trabajador/trabajador.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Mes } from '../../../../models/Mes';
import { Año } from '../../../../models/Año';
import { Empresa } from '../../../../models/Empresa';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { MostrarVacacionesComponent } from './modals/mostrar-vacaciones/mostrar-vacaciones.component';
import { AdelantarVacacionesComponent } from './modals/adelantar-vacaciones/adelantar-vacaciones.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VacacionesService } from '../../services/vacaciones/vacaciones.service';
import { ListarVacacionesComponent } from './modals/listar-vacaciones/listar-vacaciones.component';

@Component({
  selector: 'app-gestion-vacaciones',
  templateUrl: './gestion-vacaciones.component.html',
  styles: []
})
export class GestionVacacionesComponent implements OnInit {
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;

  empresa: Empresa = new Empresa();
  ano: Año = new Año();
  mes: Mes = new Mes();
  trabSeleccionado: any;

  lsTrabajadorPlanilla = null;
  lsTrabajadorHonorario = null;
  lsTrabajadorPlanillaF: any[] = [];
  lsTrabajadorHonorarioF: any[] = [];
  mostrarPlanilla:boolean = true;

  displayedColumns: string[] = [
    'nrodoc',
    'apenom',
    'tomvac',
    'venvac',
    'adelvac',
    'listvac'
  ];

  displayed2Columns: string[] = [
    'nrodoc',
    'apenom',
    'tomvac',
    'venvac',
    'adelvac'
  ];

  constructor(
    public trabajadorService: TrabajadorService,
    public serviceVacaciones: VacacionesService,
    private modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    if (this.empresa != null) {
      this.listarTrabPlanilla();
      this.listarTrabHonorario();
    }
  }

  applyFilter1(event: Event) {
    this.lsTrabajadorPlanillaF.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;
    });
    this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaF);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabajadorPlanilla.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabajadorPlanilla.paginator) {
      this.lsTrabajadorPlanilla.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    this.lsTrabajadorHonorarioF.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;
    });
    this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioF);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabajadorHonorario.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabajadorHonorario.paginator) {
      this.lsTrabajadorHonorario.paginator.firstPage();
    }
  }

  public listarTrabPlanilla() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorPlanillaF = resp.aaData;
        this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaF);
        this.lsTrabajadorPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error'); })
  }

  public listarTrabHonorario() {
    this.trabajadorService.listarTrabajadorPorComprobante(this.empresa, 2).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorHonorarioF = resp.aaData;
        this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioF);
        this.lsTrabajadorHonorario.paginator = this.paginatorlsTrabajadorHonorario;
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error'); })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
    this.refrescar(this.router.url);
  }
  public refrescar(url) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  mostrarPeriodosVacaTomar(trab) {
    const tmp = Object.assign({ accion: 'T' }, trab);
    this.openModal(tmp);
  }

  mostrarPeriodosVacaVender(trab) {
    const tmp = Object.assign({ accion: 'V' }, trab);
    this.openModal(tmp);
  }

  mostrarPeriodosVacaAdelantar(trab) { 
    const tmp = Object.assign({ accion: 'A' }, trab);
    this.openModal(tmp);
  }

  consultarVacacionesTrabajador(trab){    
    const trabajador = trab.trabajador;    
    this.serviceVacaciones.consultarVacionesTrabajador(trabajador).subscribe((resp: any) => {
      if (resp.estado == 1) {      
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
      } else { 
        this.mostrarPeriodosVacaAdelantar(trab);
    }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error'); })
  }

  public openModal(indice) {
    if (indice.accion != 'A') {
      const modalRef = this.modalService.open(MostrarVacacionesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',

        })
      modalRef.componentInstance.input_trabajador = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else {
      const modalRef = this.modalService.open(AdelantarVacacionesComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm',

        })
      modalRef.componentInstance.input_contrato = indice;
      modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

  }

  abrirLista(indice) {
    const modalRef = this.modalService.open(ListarVacacionesComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        windowClass: 'modal-mdC'
      })
    modalRef.componentInstance.input_trabajador = indice.trabajador.idTrabajador;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }


}
