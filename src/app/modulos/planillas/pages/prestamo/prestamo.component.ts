import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlanillasService } from '../../services/planillas/planillas.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../models/Constantes';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Empresa } from '../../../../models/Empresa';
import { MostrarPrestamoComponent } from './modals/mostrar-prestamo/mostrar-prestamo.component';
import { RegistrarPrestamoComponent } from './modals/registrar-prestamo/registrar-prestamo.component';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styles: []
})
export class PrestamoComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;

  constructor(
    public planillasService: PlanillasService,
    private modalService: NgbModal,
    public activemodal: NgbActiveModal
  ) { }

  lsTrabajadorPlanilla = null;
  lsTrabajadorPlanillaFilter: any[] = [];

  lsTrabajadorHonorario = null;
  lsTrabajadorHonorarioFilter: any[] = [];

  empresa: Empresa = new Empresa();

  defaultTab: any;
  activoShow = "";
  inactivoShow = "";
  activoActive = "";
  inactivoActive = "";

  displayedColumns: string[] = [
    'nrodoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    'estado',
    'ver',
    'regis',
    // 'solic'
  ];

  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    if (this.empresa != null) {
      this.gestionarTabs();
      this.listarTrabPlanilla();
      this.listarTrabHonorario();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  applyFilter(event: Event) {
    this.lsTrabajadorPlanillaFilter.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;

    });
    this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabajadorPlanilla.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabajadorPlanilla.paginator) {
      this.lsTrabajadorPlanilla.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    this.lsTrabajadorHonorarioFilter.map((x) => {
      x.nroDoc = x.trabajador.nroDoc;
      x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
      x.estado = x.trabajador.situacion.descripcion;

    });
    this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTrabajadorHonorario.filter = filterValue.trim().toLowerCase();

    if (this.lsTrabajadorHonorario.paginator) {
      this.lsTrabajadorHonorario.paginator.firstPage();
    }
  }

  listarTrabPlanilla() {
    this.planillasService.listarTrabajadorPorComprobante(this.empresa, 1).subscribe((resp: any) => {
      this.lsTrabajadorPlanillaFilter = resp.aaData;
      this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaFilter);
      this.lsTrabajadorPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;
    })
  }

  listarTrabHonorario() {
    this.planillasService.listarTrabajadorPorComprobante(this.empresa, 2).subscribe((resp: any) => {
      this.lsTrabajadorHonorarioFilter = resp.aaData;
      this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioFilter);
      this.lsTrabajadorHonorario.paginator = this.paginatorlsTrabajadorHonorario;
    })
  }

  // solicitarPrestamo(contrato) {
  //   var tmp = Object.assign({}, contrato);
  //   tmp.accion = Constantes.SOLICITAR;
  //   this.openModal(tmp);
  // }

  registrarPrestamo(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = Constantes.REGISTRAR;
    this.openModal(tmp);
  }

  mostrarPrestamo(trabajador) {
    var tmp = Object.assign({}, trabajador);
    tmp.accion = Constantes.MOSTRAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    switch (indice.accion) {
      case "R":
        this.modalRef = this.modalService.open(RegistrarPrestamoComponent,
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

    //   case "S":
    //       this.modalRef = this.modalService.open(SolicitarAdelantoSueldoComponent,
    //         {
    //           backdrop: 'static',
    //           keyboard: false,
    //           windowClass: 'modal-mdB'
    //         })
    //       this.modalRef.componentInstance.input_contrato = indice;
    //       this.modalRef.result.then((result) => {
    //       }, (reason) => {
    //       });
    //     break;

      default:
        this.modalRef = this.modalService.open(MostrarPrestamoComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modalMDD'
          })
        this.modalRef.componentInstance.input_trabajador = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
        });
        break;
    }
  }

  gestionarTabs() {
    this.defaultTab = JSON.parse(localStorage.getItem('defaultTabs'));
    if (this.defaultTab.pagPrestamo.estado) {
      this.activoActive = this.defaultTab.active
      this.activoShow = this.defaultTab.descripcion;
      this.inactivoActive = "";
      this.inactivoShow = "";
    } else {
      this.inactivoActive = this.defaultTab.active
      this.inactivoShow = this.defaultTab.descripcion;
      this.activoActive = "";
      this.activoShow = "";
    }
  }

  cambiarTabs(valor) {
    this.defaultTab.pagPrestamo.estado = valor;
    localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
  }

}
