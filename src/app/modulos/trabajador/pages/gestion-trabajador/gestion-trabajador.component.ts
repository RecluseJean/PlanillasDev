import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoGestionTrabajadorComponent } from './modals/nuevo-gestion-trabajador/nuevo-gestion-trabajador.component';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { Empresa } from '../../../../models/Empresa';
import { NuevoGestionTrabajadorConfirmarComponent } from './modals/nuevo-gestion-trabajador-confirmar/nuevo-gestion-trabajador-confirmar.component';
import Swal from 'sweetalert2';
import Constantes from '../../../../models/Constantes';
import { TipoComprobanteComponent } from './modals/tipo-comprobante/tipo-comprobante.component';
import { ReporteContratoComponent } from './modals/reporte-contrato/reporte-contrato.component';
import { GestionRemuDsctComponent } from './modals/gestion-remu-dsct/gestion-remu-dsct.component';
import { Router } from '@angular/router';
import { GestionHuellaDigitalComponent } from './modals/gestion-huella-digital/gestion-huella-digital.component';
import { HuelleroService } from '../../services/huellero/huellero.service';
import { Huellero } from '../../../../models/Huellero';
import { saveAs } from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, transition, style, animate } from '@angular/animations';

const publicIp = require('public-ip');

@Component({
  selector: 'app-gestion-trabajador',
  templateUrl: './gestion-trabajador.component.html',
  styleUrls: ['gestion-trabajador.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GestionTrabajadorComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorPlanillaInac', { static: true }) paginatorlsTrabajadorPlanillaInac: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorarioInac', { static: true }) paginatorlsTrabajadorHonorarioInac: MatPaginator;

  constructor(
    private modalService: NgbModal,
    public trabajadorService: TrabajadorService,
    public huelleroService: HuelleroService,
    private router: Router
  ) { }

  displayedColumns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'huella',
    'cntrato',
    'gestion',
    'actualizar',
    'eliminar'
  ];

  displayed1Columns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'huella',
    'cntrato',
    'gestion',
    'actualizar',
    'eliminar'
  ];

  displayed2Columns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    'gestion',
    'contrato',
    'actualizar',
    'eliminar'
  ];

  displayed3Columns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'fechnac',
    'sexo',
    // 'estado',
    'contrato',
    'actualizar',
    'eliminar'
  ];

  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  activoActive = "";
  inactivoActive = "";

  expandedElement: Object | null;
  expanded1Element: Object | null;
  expanded2Element: Object | null;
  expanded3Element: Object | null;

  ipPublica: string;
  huellero: any = new Huellero();
  empresa: any = new Empresa();
  lsTrabajador: any[] = [];
  lsTrabajadorPlanilla = null;
  lsTrabajadorPlanillaFilter: any[] = [];
  lsTrabajadorPlanillaInac = null;
  lsTrabajadorPlanillaInacFilter: any[] = [];
  lsTrabajadorHonorario = null;
  lsTrabajadorHonorarioFilter: any[] = [];
  lsTrabajadorHonorarioInac = null;
  lsTrabajadorHonorarioInacFilter: any[] = [];
  trabPlanillaEstado = true;
  trabHonorarioEstado = true;
  // expanded: boolean = false;
  tipoPlanilla: any;

  modalRef: NgbModalRef;
  contratoGenerado: boolean;
  error: any;

  cerrar = false;

  ngOnInit() {
    (async () => {
      this.ipPublica = await publicIp.v4();
    })();
    this.gestionarTabs();

    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));

    if (this.empresa != null) {
      this.listarTrabajadorPlanilla();
      this.listarTrabajadorHonorario();
      this.listarTrabajadorPlanillaInactivos();
      this.listarTrabajadorHonorarioInactivos();
    }
  }

  infoTrabajador(contrato) {
    this.trabajadorService.setContrato(contrato);
    this.router.navigateByUrl('/infoGestionTrabajador');
  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }

  eliminarTrabajador(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  gestionRemuDsct(trab) {
    var tmp = Object.assign({}, trab);
    tmp.accion = "G";
    this.openModal(tmp);
  }

  generarContrato(trab) {
    this.trabajadorService.generarContrato(trab).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.contratoGenerado = true;
        var tmp_tra = Object.assign({}, trab);
        tmp_tra.accion = Constantes.REPORTEWORD;
        this.openModal(tmp_tra);
      } else {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
      }
    });
  }

  cambiarEstadoPlanilla(estado: boolean) {
    this.trabPlanillaEstado = estado;
  }

  cambiarEstadoHonorario(estado: boolean) {
    this.trabHonorarioEstado = estado;
  }

  gestionHuella(trab) {
    var tmp = Object.assign({}, trab);
    tmp.accion = "H";

    this.empresa.ruc = this.ipPublica;
    this.huelleroService.buscarHuellero(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.huellero = resp.defaultObj;
        this.huelleroService.iniciarHullero(this.huellero.sipPrivada).subscribe((respuesta: any) => {
          if (respuesta.estado == 1) {
            Swal.fire(Constantes.INFO, 'Coloque su dedo indice derecho 3 veces en el dispositivo', 'info');
            this.openModal(tmp);
          }
        })
      } else {
        Swal.fire(Constantes.INFO, resp.msg, 'info');
      }
    })
  }

  public listarTrabajadorPlanilla() {
    this.trabajadorService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 1, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorPlanillaFilter = resp.aaData;
        this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaFilter);
        this.lsTrabajadorPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  public listarTrabajadorPlanillaInactivos() {
    this.trabajadorService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 1, 2).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorPlanillaInacFilter = resp.aaData;
        this.lsTrabajadorPlanillaInac = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaInacFilter);
        this.lsTrabajadorPlanillaInac.paginator = this.paginatorlsTrabajadorPlanillaInac;
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  public listarTrabajadorHonorario() {
    this.trabajadorService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 2, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorHonorarioFilter = resp.aaData;
        this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioFilter);
        this.lsTrabajadorHonorario.paginator = this.paginatorlsTrabajadorHonorario;
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  public listarTrabajadorHonorarioInactivos() {
    this.trabajadorService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 2, 2).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTrabajadorHonorarioInacFilter = resp.aaData;
        this.lsTrabajadorHonorarioInac = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioInacFilter);
        this.lsTrabajadorHonorarioInac.paginator = this.paginatorlsTrabajadorHonorarioInac;
      }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error, 'error');
        this.error = err;
      })
  }

  applyFilter(event: Event) {
    if (this.trabPlanillaEstado) {
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
    } else {
      this.lsTrabajadorPlanillaInacFilter.map((x) => {
        x.nroDoc = x.trabajador.nroDoc;
        x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
        x.estado = x.trabajador.situacion.descripcion;
      });

      this.lsTrabajadorPlanillaInac = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaInacFilter);
      const filterValue = (event.target as HTMLInputElement).value;
      this.lsTrabajadorPlanillaInac.filter = filterValue.trim().toLowerCase();

      if (this.lsTrabajadorPlanillaInac.paginator) {
        this.lsTrabajadorPlanillaInac.paginator.firstPage();
      }
    }
  }

  applyFilter2(event: Event) {
    if (this.trabHonorarioEstado) {
      this.lsTrabajadorHonorarioFilter.map((x) => {
        x.nroDoc = x.trabajador.nroDoc;
        x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
        x.estado = x.trabajador.situacion.descripcion;
        x.sexo = x.trabajador.sexo;
      });

      this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioFilter);
      const filterValue = (event.target as HTMLInputElement).value;
      this.lsTrabajadorHonorario.filter = filterValue.trim().toLowerCase();

      if (this.lsTrabajadorHonorario.paginator) {
        this.lsTrabajadorHonorario.paginator.firstPage();
      }
    } else {
      this.lsTrabajadorHonorarioInacFilter.map((x) => {
        x.nroDoc = x.trabajador.nroDoc;
        x.datos = x.trabajador.apePater + ' ' + x.trabajador.apeMater + ' ' + x.trabajador.nombres;
        x.estado = x.trabajador.situacion.descripcion;
        x.sexo = x.trabajador.sexo;
      });

      this.lsTrabajadorHonorarioInac = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioInacFilter);
      const filterValue = (event.target as HTMLInputElement).value;
      this.lsTrabajadorHonorarioInac.filter = filterValue.trim().toLowerCase();

      if (this.lsTrabajadorHonorarioInac.paginator) {
        this.lsTrabajadorHonorarioInac.paginator.firstPage();
      }
    }

  }

  public actualizarTrabajador(trabajador_u) {
    var tmp_tra = Object.assign({}, trabajador_u);
    tmp_tra.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp_tra);
  }

  nuevoTrabajador() {
    var tmp_tra: any = {
      'accion': Constantes.REGISTRAR
    }
    this.openModal(tmp_tra);
  }

  public generarReporteTrabajadorGen() {
    var empresaDTO = {
      "empresa": this.empresa
    }

    this.trabajadorService.generarReporteTrabajadorGen(empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        var nombreArchivo = "Reporte_Trabajadores_General.xlsx";
        this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
          var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file, nombreArchivo);
          Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
        })
      }
    })

  }

  public generarReporteTrabajador4TA() {
    var empresaDTO = {
      "empresa": this.empresa
    }

    this.trabajadorService.generarReporteTrabajador4TA(empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        var nombreArchivo = "Reporte_Trabajadores_4TA.xlsx";
        //this.lsTrabajadorHonorario = resp.aaData;
        this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
          var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file, nombreArchivo);
          Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
        })
      }
    })

  }

  public generarReporteTrabajador5TA() {
    var empresaDTO = {
      "empresa": this.empresa
    }

    this.trabajadorService.generarReporteTrabajador5TA(empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        var nombreArchivo = "Reporte_Trabajadores_5TA.xlsx";
        //this.lsTrabajadorHonorario = resp.aaData;
        this.trabajadorService.descargarReporte(nombreArchivo).subscribe((result: any) => {
          var file = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file, nombreArchivo);
          Swal.fire(Constantes.SUCCESS, "Archivo descargado correctamente", 'success');
        })
      }
    })

  }

  public openModal(indice) {debugger
    switch (indice.accion) {
      case 'U': this.modalRef = this.modalService.open(NuevoGestionTrabajadorComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalLG'
        })
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;

      case 'D': this.modalRef = this.modalService.open(NuevoGestionTrabajadorConfirmarComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;

      case 'G': this.modalRef = this.modalService.open(GestionRemuDsctComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg',
          windowClass: 'modal-mdC'
        }
      );
        this.modalRef.componentInstance.input_trab = indice;
        this.modalRef.result.then((result) => {
        }, (reason) => {
          if (reason == "refrescar") {
            indice.accion = "G"
            this.cerrar = true;
            this.refrescar(this.router.url);
            this.openModal(indice)
          }
        });
        break;

      case 'W': this.modalRef = this.modalService.open(ReporteContratoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-md'
        }
      );
        this.modalRef.componentInstance.input_contrato = indice;
        break;

      case 'H':
        this.modalRef = this.modalService.open(GestionHuellaDigitalComponent,
          {
            backdrop: 'static',
            keyboard: false,
            windowClass: 'modal-md'
          });
        this.modalRef.componentInstance.input_contrato = indice;
        break;

      default: this.modalRef = this.modalService.open(TipoComprobanteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
    }

  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  gestionarTabs(){
    this.defaultTab = JSON.parse(localStorage.getItem('defaultTabs'));
    if (this.defaultTab.pagTrabajador.estado) {
      this.activoActive = this.defaultTab.active
      this.activoShow =  this.defaultTab.descripcion;
      this.inactivoActive = "";
      this.inactivoShow = "";
    } else {
      this.inactivoActive = this.defaultTab.active
      this.inactivoShow = this.defaultTab.descripcion;
      this.activoActive = "";
      this.activoShow = "";
    }
  }

  cambiarTabs(valor){
    this.defaultTab.pagTrabajador.estado = valor;
    localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
  }

  async escogerExcelMasivo(excel) {
      await this.alertCargando();
      var selecArch = excel.target.files[0];
      debugger
      this.trabajadorService.cargaExcelMasiva(selecArch).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, "Carga masiva general realizada correctamente", "success");
        } else if (resp.estado == 0) {
          Swal.fire(Constantes.INFO, resp.msg, "info");
        } else { Swal.fire(Constantes.ERROR, resp.msg, "error"); }
      }, (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
  }

  async alertCargando() {
    let timerInterval = 5000;
    await Swal.fire({
      title: 'Generando carga masiva',
      html: 'Espere un momento por favor...',
      timer: timerInterval,

      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })
  }

}
