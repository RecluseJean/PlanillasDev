import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Empresa } from '../../../../models/Empresa';
import { PlanillasService } from '../../services/planillas/planillas.service';
import Constantes from '../../../../models/Constantes';
import { SolicitarAdelantoSueldoComponent } from './modals/solicitar-adelanto-sueldo/solicitar-adelanto-sueldo.component';
import { MostrarAdelantoSueldoComponent } from './modals/mostrar-adelanto-sueldo/mostrar-adelanto-sueldo.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RegistrarAdelantoSueldoComponent } from './modals/registrar-adelanto-sueldo/registrar-adelanto-sueldo.component';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { Trabajador } from '../../../../models/Trabajador';

@Component({
  selector: 'app-adelanto-sueldo',
  templateUrl: './adelanto-sueldo.component.html',
  styles: []
})
export class AdelantoSueldoComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;

  constructor(
    public planillasService: PlanillasService,
    private modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
  ) { }

  modalRef: NgbModalRef;

  lsTrabPlanilla = null;
  lsTrabPlanillaFilter: any[] = [];
  lsTrabHonorario = null;
  lsTrabHonorarioFilter: any[] = [];

  empresa: Empresa = new Empresa();

  trabajador: any = new Trabajador();

  displayedColumns: string[] = [
    'nrodoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    'estado',
    'descarga',
    'ver',
    'regis',
    'solic'
  ];

  displayed2Columns: string[] = [
    'nrodoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    'estado',
    'descarga',
    'ver',
    'regis',
    'solic'
  ];

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    if (this.empresa != null) {
      this.listarTrabPlanilla()
      this.listarTrabHonorario();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTrabPlanilla() {
    this.planillasService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      this.lsTrabPlanillaFilter = resp.aaData;
      this.lsTrabPlanilla = new MatTableDataSource<Object>(this.lsTrabPlanillaFilter);
      this.lsTrabPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;
    })
  }

  listarTrabHonorario() {
    this.planillasService.listarTrabajadorPorComprobante(this.empresa, 2).subscribe((resp: any) => {
      this.lsTrabHonorarioFilter = resp.aaData;
      this.lsTrabHonorario = new MatTableDataSource<Object>(this.lsTrabHonorarioFilter);
      this.lsTrabHonorario.paginator = this.paginatorlsTrabajadorHonorario;
    })
  }

  applyFilter(event: Event) {
    this.lsTrabPlanillaFilter.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;

    });
    this.lsTrabPlanilla = new MatTableDataSource<Object>(this.lsTrabPlanillaFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabPlanilla.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabPlanilla.paginator) {
      this.lsTrabPlanilla.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    this.lsTrabHonorarioFilter.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;

    });
    this.lsTrabHonorario = new MatTableDataSource<Object>(this.lsTrabHonorarioFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabHonorario.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabHonorario.paginator) {
      this.lsTrabHonorario.paginator.firstPage();
    }
  }

  registrarAs(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = Constantes.REGISTRAR;
    this.openModal(tmp);
  }

  solicitarAs(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = Constantes.SOLICITAR;
    this.openModal(tmp);
  }

  mostrarAS(trabajador) {
    var tmp = Object.assign({}, trabajador);
    tmp.accion = Constantes.MOSTRAR;
    //mostrar = M
    this.openModal(tmp);
  }

  openModal(indice) {
    switch (indice.accion) {
      case "R":
        this.modalRef = this.modalService.open(RegistrarAdelantoSueldoComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-mdB'
          })
        this.modalRef.componentInstance.input_contrato = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
        });
        break;

      case "S":
        this.modalRef = this.modalService.open(SolicitarAdelantoSueldoComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-mdB'
          })
        this.modalRef.componentInstance.input_contrato = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
        });
        break;

      default:
        this.modalRef = this.modalService.open(MostrarAdelantoSueldoComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modalLG'
          })
        this.modalRef.componentInstance.input_trabajador = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
        });
        break;
    }
  }

  public generarReporteAdelantoGeneral() { debugger
    var empresaDTO = {
      "empresa": this.empresa
    }
    this.planillasService.generarRepAdelantoGeneral(empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        var nombreArchivo = "Reporte_Adelanto_General.xlsx";
        this.planillasService.descargarReporte(nombreArchivo).subscribe((result: any) => {
          var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file, nombreArchivo);
          Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
        })
      }
    })

  }

  public generarReporteAdelantoTrabajador(trabajador) { debugger
    var adeDTO = {
      "trabajador": trabajador
    }
    this.planillasService.generarRepAdelantoTrabajador(adeDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        var nombreArchivo = "Reporte_Adelanto_Trabajador.xlsx";
        this.planillasService.descargarReporte(nombreArchivo).subscribe((result: any) => {
          var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file, nombreArchivo);
          Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
        })
      }
    })

  }

}
