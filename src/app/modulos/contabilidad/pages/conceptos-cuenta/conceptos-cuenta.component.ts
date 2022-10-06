import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { ConceptoPlanilla } from '../../../../models/ConceptoPlanilla';
import { CuentaContable } from '../../../../models/CuentaContable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoConceptoCuentaComponent } from './modals/nuevo-concepto-cuenta/nuevo-concepto-cuenta.component';
import { ConfirmarConceptoCuentaComponent } from './modals/confirmar-concepto-cuenta/confirmar-concepto-cuenta.component';
import { ConceptoCuentaService } from '../../services/concepto-cuenta/concepto-cuenta.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { saveAs } from 'file-saver';
import { Mes } from '../../../../models/Mes';
import { Año } from '../../../../models/Año';
import { transition, state, style, animate, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { ConfigVistaPlameComponent } from './modals/config-vista-plame/config-vista-plame.component';

@Component({
  selector: 'app-conceptos-cuenta',
  templateUrl: './conceptos-cuenta.component.html',
  styleUrls: ['conceptos-cuenta.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConceptosCuentaComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsconcepto', { static: true }) paginatorlsconcepto: MatPaginator;
  @ViewChild('paginatorlscuenta', { static: true }) paginatorlscuenta: MatPaginator;
  @ViewChild('paginatorlsplame', { static: true }) paginatorlsplame: MatPaginator;
  @ViewChild('paginatorlsvistaplame', { static: true }) paginatorlsvistaplame: MatPaginator;

  empresa: Empresa = new Empresa();
  mostrar: boolean = true;
  ano: Año = new Año();
  mes: Mes = new Mes();

  lsconcepto = null;
  lsconceptoFilter: any[] = [];
  lscuenta  = null;
  lscuentaFilter: any[] = [];
  lsplameFilter: any[] = [];
  lsvistaplameFilter: any[] = [];
  lsplame  = null;
  lsvistaplame = null;

  modalRef: NgbModalRef;

  expandedElement: Object | null;
  expanded: boolean = false;


  displayedColumns: string[] = [
    'descripcion',
    'cuenta_haber_prov',
    'cuenta_debe_prov',
    'cuenta_haber_pago',
    'cuenta_debe_pago',
    'concepto_plame',
    'actualizar'
  ];

  displayedColumns2:string[]=[
    'codigo',
    'descripcion'
  ]

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public conceptoCuentaSercive: ConceptoCuentaService
  ) { }

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    if (this.empresa != null) {
      this.listarConceptoPlanilla();
      this.listarCuentaContable();
      this.listarConceptoPlame();
      //this.listarVistaPlame();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarConceptoPlanilla() {
    this.conceptoCuentaSercive.listarConceptoPlanilla(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsconceptoFilter = resp.aaData;
        this.lsconcepto = new MatTableDataSource<any>(this.lsconceptoFilter);
        this.lsconcepto.paginator = this.paginatorlsconcepto;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  listarCuentaContable() {
    this.conceptoCuentaSercive.listarCuentaContable(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lscuentaFilter = resp.aaData;
        this.lscuenta = new MatTableDataSource<any>(this.lscuentaFilter);
        this.lscuenta.paginator = this.paginatorlscuenta;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  listarConceptoPlame() {
    this.conceptoCuentaSercive.listarConceptoPlame().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsplameFilter = resp.aaData;
        this.lsplame = new MatTableDataSource<any>(this.lsplameFilter);
        this.lsplame.paginator = this.paginatorlsplame;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  /* listarVistaPlame() {
    this.conceptoCuentaSercive.listarVistaPlame(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsvistaplameFilter = resp.aaData;
        this.lsvistaplame = new MatTableDataSource<any>(this.lsvistaplameFilter);
        this.lsvistaplame.paginator = this.paginatorlsvistaplame;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  } */

  generarReporteCueCon() {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genReporteCueCon, "info");
    } else {


      var empresaDTO = {
        "empresa": this.empresa,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }
      this.conceptoCuentaSercive.generarReporteCueCon(empresaDTO).subscribe((resp: any) => {
        if (resp.estado == 1) {
          var nombreArchivo = "ReporteCtaCont.xlsx";
          this.conceptoCuentaSercive.descargarReporte(nombreArchivo).subscribe((result: any) => {
            var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(file, nombreArchivo);
            Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
          })
        }
      })
    }
  }

  public crearConcepto() {
    var concepto: any = new ConceptoPlanilla();
    concepto.accion = "RCO";
    this.openModal(concepto);
  }

  public actualizarConcepto(concepto) {
    var tmp = Object.assign({}, concepto);
    tmp.accion = "ACO";
    this.openModal(tmp);
  }

  public eliminarConcepto(concepto) {
    var tmp = Object.assign({}, concepto);
    tmp.accion = "DCO";
    this.openModal(tmp);
  }

  public crearCuenta() {
    var cuenta: any = new CuentaContable();
    cuenta.accion = "RCU";
    this.openModal(cuenta);
  }

  public actualizarCuenta(cuenta) {
    var tmp = Object.assign({}, cuenta);
    tmp.accion = "ACU";
    this.openModal(tmp);
  }

  public eliminarCuenta(cuenta) {
    var tmp = Object.assign({}, cuenta);
    tmp.accion = "DCU";
    this.openModal(tmp);
  }

  public configVistaPlame() {//debugger
    var tmp={
      accion:""
    };
    tmp.accion = "CVP";
    this.openModal(tmp);
  }

  openModal(obj) {

    if (obj.accion != "DCO" && obj.accion != "DCU" && obj.accion != "CVP") {
      this.modalRef = this.modalService.open(NuevoConceptoCuentaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_concue = obj;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if  (obj.accion == "CVP") {
      this.modalRef = this.modalService.open(ConfigVistaPlameComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalLG'
        })
      this.modalRef.componentInstance.input_vista_plame = obj;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
    else {
      this.modalRef = this.modalService.open(ConfirmarConceptoCuentaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_concue = obj;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsconcepto.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lscuenta.filter = filterValue.trim().toLowerCase();
  }

}
