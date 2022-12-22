import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalculoPlanillaComponent } from "./modals/calculo-planilla/calculo-planilla.component";
import { Router } from "@angular/router";
import { PlanillasService } from "../../services/planillas/planillas.service";
import { Empresa } from "../../../../models/Empresa";
import Swal from "sweetalert2";
import Constantes from '../../../../models/Constantes';
import { MostrarBoletaComponent } from "./modals/mostrar-boleta/mostrar-boleta.component";
import { Año } from "../../../../models/Año";
import { Mes } from "../../../../models/Mes";
import { MostrarRheComponent } from './modals/mostrar-rhe/mostrar-rhe.component';
import { Trabajador } from "../../../../models/Trabajador";
import { GenerarTxtComponent } from './modals/generar-txt/generar-txt.component';
import { TipoPlanillaService } from '../../../configuracion/services/tipo-planilla/tipo-planilla.service';
import { TipoPlanilla } from '../../../../models/Tipo-Planilla';
import { ConfirmarCalculoPlanillaComponent } from './modals/confirmar-calculo-planilla/confirmar-calculo-planilla.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenerarExcelComponent } from './modals/generar-excel/generar-excel.component';
import { GestionSuspencionComponent } from './modals/gestion-suspencion/gestion-suspencion.component';
import { TrabajadorService } from '../../../trabajador/services/trabajador/trabajador.service';
import { NgSelectComponent } from '@ng-select/ng-select';



@Component({
  selector: "app-generar-planilla",
  templateUrl: "./generar-planilla.component.html",
  styles: []
})
export class GenerarPlanillaComponent implements OnInit, OnDestroy {
  checkAction() {
    throw new Error("Method not implemented.");
  }
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;
  @ViewChild('ngSelectComponent',{ static: true }) ngSelectComponent: NgSelectComponent;

  constructor(
    public trabajadorService: TrabajadorService,
    public planillasService: PlanillasService,
    public tipoPlanillaService: TipoPlanillaService,
    public modalService: NgbModal,
    private router: Router,
    public activemodal: NgbActiveModal
  ) { }

  empresa: Empresa = new Empresa();
  lsTrabajador: any[] = [];
  ano: Año = new Año();
  mes: Mes = new Mes();
  tipo_tardanza: any;
  tipo_rango: any;
  id_tipo_tardanza: any;
  selecArch: File;
  infoToken: any;

  Cuarta_Categoria = [{
    'cuartacat': 'column1'
  }];

  Quinta_Categoria = [{
    'quintacat': 'column1'
  }]

  displayedColumns4ta: string[] = [
    '4cat'
  ];

  displayed2Columns5ta: string[] = [
    '5cat'
  ];

  displayedColumns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'estado',
    'plan',
    'boleta'
  ];

  displayed2Columns: string[] = [
    'numdoc',
    'apenom',
    'correo',
    'estado',
    'genarchper',
    'susp',
    'rhe'
  ];


  trabajador: Trabajador = new Trabajador();
  tipoPlan: TipoPlanilla = null;

  lsderHab: Array<any> = Constantes.DerechoHab;

  lsTipoPlanilla: any[] = [];
  lsTrabajadorPlanilla = null;
  lsTrabajadorHonorario = null;
  lsTrabajadorPlanillaFilter: any[] = [];
  lsTrabajadorHonorarioFilter: any[] = [];
  Lstipoplanilla: any[] = [];


  tipoComprob: number = null;

  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  active4ta = "active";
  active5ta = "";
  showAct4ta = "show active";
  showAct5ta = "";
  cerrar = false;

  modalRef: NgbModalRef;

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("objEmpresaSeleccion"));
    this.ano = JSON.parse(localStorage.getItem("anoSeleccion"));
    this.mes = JSON.parse(localStorage.getItem("mesSeleccion"));
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));
    if ((this.empresa != null && this.ano == null && this.mes == null)) {
      this.cambiarTabs(4);
      this.ngSelectComponent.clearModel();
      this.guardarTardanzaLocal();
/*       this.listarTiposPlanillaPorPerfil();  */
      var tmpTipPlan = JSON.parse(localStorage.getItem("tipoPlanilla"));
      this.listarPorCategoria(tmpTipPlan.categoriaPlanilla,this.empresa.idEmpresa);
      if (tmpTipPlan != null) {
        if(tmpTipPlan.categoriaPlanilla == 5){
          this.active4ta = "";
          this.showAct4ta = "";
          this.active5ta = "active";
          this.showAct5ta = "show active";
        }
        this.tipoPlan = tmpTipPlan;
        this.listarTrabajadoresPorTipoPlanilla()
      }
    }
    else {
      this.guardarTardanzaLocal();
/*       this.listarTiposPlanillaPorPerfil();  */
      var tmpTipPlan = JSON.parse(localStorage.getItem("tipoPlanilla"));
      this.listarPorCategoria(tmpTipPlan.categoriaPlanilla,this.empresa.idEmpresa);
      if (tmpTipPlan != null) {
        if(tmpTipPlan.categoriaPlanilla == 5){
          this.active4ta = "";
          this.showAct4ta = "";
          this.active5ta = "active";
          this.showAct5ta = "show active";
        }
        this.tipoPlan = tmpTipPlan;
        this.listarTrabajadoresPorTipoPlanilla()
      }
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

  applyFilter1(event: Event) {
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

  listarTiposPlanillaPorPerfil() { //debugger
    var empresaDTO = {
      "idPerfil": this.infoToken.id_perfil,
      "empresa": this.empresa
    }
    this.tipoPlanillaService.listarTipoPlanillaPorPerfil(empresaDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPlanilla = resp.aaData;
      }
    })

  }

  //ruben

  cambiarTabs(valor){
/*     this.Lstipoplanilla = []; */
   this.tipoPlan = null;
    var categoria;
    if(valor == 5){
      categoria = 5
    }else {
      categoria = 4
    }
    this.trabajadorService.listarTipoPlanillaPorCategoria(categoria,this.empresa.idEmpresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPlanilla = resp.aaData;
      }
    })
  }
  listarPorCategoria(categoria,idEmp){
    this.trabajadorService.listarTipoPlanillaPorCategoria(categoria,idEmp).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoPlanilla = resp.aaData;
      }
    })
  }




//ruben fin



  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTrabajadoresPorTipoPlanilla() {
    if (this.tipoPlan != null) {
      if (this.tipoPlan.categoriaPlanilla == 5) {
        this.tipoPlanillaService.listarTrabajadoresPorTipoPlanilla(this.tipoPlan).subscribe((resp: any) => {

          this.lsTrabajadorPlanillaFilter = resp.aaData;
          this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabajadorPlanillaFilter);
          this.lsTrabajadorPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;

          // this.lsTrabajadorPlanilla = resp.aaData;
        });
      } else {
        this.tipoPlanillaService.listarTrabajadoresPorTipoPlanilla(this.tipoPlan).subscribe((resp: any) => {
          this.lsTrabajadorHonorarioFilter = resp.aaData;
          this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabajadorHonorarioFilter);
          this.lsTrabajadorHonorario.paginator = this.paginatorlsTrabajadorHonorario;

          // this.lsTrabajadorHonorario = resp.aaData;
        })
      }
    }
  }

  changeTipoPlanilla() {
    if (this.tipoPlan != null) {
      localStorage.setItem("tipoPlanilla", JSON.stringify(this.tipoPlan));
      this.listarTrabajadoresPorTipoPlanilla();
    } else {
      localStorage.removeItem("tipoPlanilla");
    }
  }

  calcularPlanillaMasiva() {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genPlanillaMasiva, "info");
    } else {
      var tmp_tardanza = JSON.parse(localStorage.getItem("tipoDeTardanza"));
      const planillaFinal = {
        "contrato": null,
        "tipoPlanilla": this.tipoPlan,
        "tardanza": tmp_tardanza,
        "pdoAno": this.ano,
        "pdoMes": this.mes
      }
      this.openConfirmarModal(planillaFinal)
    }
  }

  public openConfirmarModal(planillaFinal) {
    this.modalRef = this.modalService.open(ConfirmarCalculoPlanillaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      });
    this.modalRef.componentInstance.input_planilla_final = planillaFinal;
    this.modalRef.result.then(
      result => {
      },
      reason => { }
    );
  }

  calcularPlanilla(indice) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, Constantes.genPlanilla, "info");
    } else {
      var fech_ini: Date = new Date(indice.fecInicio);

      if (this.ano.descripcion < fech_ini.getFullYear()) {
        Swal.fire(
          Constantes.INFO,
          `El trabajador ingreso en el año ${fech_ini.getFullYear()}, selecciona un año distinto`,
          "warning"
        );
      } else {
        if (
          this.mes.idPdoMes < fech_ini.getMonth() + 1 &&
          this.ano.descripcion <= fech_ini.getFullYear()
        ) {
          Swal.fire(
            Constantes.INFO,
            `El trabajador ingreso en el mes de ${this.obtenerDescMes(
              fech_ini.getMonth()
            )}, selecciona un mes distinto`,
            "warning"
          );
        } else {
          var tmp_ano = JSON.parse(localStorage.getItem("anoSeleccion"));
          var tmp_mes = JSON.parse(localStorage.getItem("mesSeleccion"));
          var tmp_tardanza = JSON.parse(localStorage.getItem("tipoDeTardanza"));
          var tmp_tiporango;
          switch (tmp_tardanza.valor) {
            case "2": tmp_tiporango = JSON.parse(localStorage.getItem("tipoDeRango")); break;
            default: tmp_tiporango = null;
          }
          var planilla_final = {
            "contrato": indice,
            "tipoPlanilla": this.tipoPlan,
            "tardanza": tmp_tardanza,
            "tipoRango": tmp_tiporango,
            "pdoAno": tmp_ano,
            "pdoMes": tmp_mes
          }
          this.openModal(planilla_final);
        }
      }
    }
  }

  mostrarBoletas(indice) {
    this.openModalBoleta(indice);
  }

  public refrescar(url) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  guardarTardanzaLocal() {
    var tmp_tardanza = {
      codigo: String,
      descripcion: String,
      estado: Number,
      grupo: String,
      idParametro: Number,
      nombre: String,
      valor: String
    };

    this.planillasService
      .obtenerTipoTardanza(this.empresa)
      .subscribe((resp: any) => {
        if (resp != null) {
          this.tipo_tardanza = resp.defaultObj;
          tmp_tardanza = this.tipo_tardanza;
          this.id_tipo_tardanza = this.tipo_tardanza.valor;
          localStorage.setItem("tipoDeTardanza", JSON.stringify(tmp_tardanza));
          this.indicarTipoTard();
        } else {
          Swal.fire(Constantes.ERROR, "No se encontro el parametro", "error");
        }
      });
  }

  obtenerTipodeRango() {
    var tmp_rango = {
      codigo: String,
      descripcion: String,
      estado: Number,
      grupo: String,
      idParametro: Number,
      nombre: String,
      valor: String
    };
    this.planillasService
      .obtenerTipoRango(this.empresa)
      .subscribe((resp: any) => {
        if (resp != null) {
          this.tipo_rango = resp.defaultObj;
          tmp_rango = this.tipo_rango;
          localStorage.setItem("tipoDeRango", JSON.stringify(tmp_rango));
        } else {
          Swal.fire(Constantes.ERROR, "No se encontro el rango", "error");
        }
      });
  }

  indicarTipoTard() {
    switch (this.id_tipo_tardanza) {
      case "1":
        localStorage.removeItem("tipoDeRango");
        break;
      case "2":
        this.obtenerTipodeRango();
        break;
    }
  }

  public openModal(indice) {
    this.modalRef = this.modalService.open(ConfirmarCalculoPlanillaComponent, {
      backdrop: "static",
      keyboard: false,
      size: 'sm'
    });
    this.modalRef.componentInstance.input_planilla_final = indice;
    this.modalRef.result.then(
      result => {
      }, reason => { }
    );
  }

  public openModalBoleta(indice) {
    this.modalRef = this.modalService.open(MostrarBoletaComponent, {
      backdrop: "static",
      keyboard: false,
      size: "lg"
    });
    this.modalRef.componentInstance.input_trabajador = indice;
    this.modalRef.result.then(
      result => { },
      reason => { }
    );
  }
  obtenerDescMes(valor): String {
    switch (valor) {
      case 0:
        return "ENERO";
      case 1:
        return "FEBRERO";
      case 2:
        return "MARZO";
      case 3:
        return "ABRIL";
      case 4:
        return "MAYO";
      case 5:
        return "JUNIO";
      case 6:
        return "JULIO";
      case 7:
        return "AGOSTO";
      case 8:
        return "SETIEMBRE";
      case 9:
        return "OCTUBRE";
      case 10:
        return "NOVIEMBRE";
      case 11:
        return "DICIEMBRE";
      default:
        return "INDEFINIDO";
    }
  }


  abrirRHE(indice) {
    const modalRef = this.modalService.open(MostrarRheComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        windowClass: 'modal-mdC'
      })
    modalRef.componentInstance.input_Trab = indice;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  openModalSituacion(trabajador) {
    this.modalRef = this.modalService.open(GestionSuspencionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      });
    this.modalRef.componentInstance.input_trabajador = trabajador;
    this.modalRef.result.then(
      result => {
      },
      reason => { }
    );
  }

  // cargarArchivo(trab) {
  //   const idTrab = trab.idTrabajador;
  //   this.planillasService.subirArchivo(this.selecArch, idTrab).subscribe((resp: any) => {
  //     if (resp.estado == 1) {
  //       Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
  //       // this.listarTrabajadorHonorario();
  //     } else if (resp.estado == 2) {
  //       Swal.fire(Constantes.WARNING, resp.msg, 'warning');
  //       // this.listarTrabajadorHonorario();
  //     } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
  //   })
  // }

  generarTxtGeneral() {
    const indice = null;
    this.openModalTxt(indice);
  }

  xlsConsolidado(){ debugger
    this.openModalXls(this.tipoPlan);
    //console.log(this.tipoPlan,'tipoplanila')
  }

  openModalXls(indice) {
    this.modalRef = this.modalService.open(GenerarExcelComponent,{
      backdrop: "static",
      keyboard: false,
      windowClass: 'modalMD'
    });
    this.modalRef.componentInstance.input_tpoPlan = indice;
    this.modalRef.result.then(
      result => { },
      reason => { }
    );
  }

  generarTxtPersonal(contrato) {
    var tmp = Object.assign({}, contrato);
    tmp.accion = "G";
    this.openModalTxt(tmp);
  }

  openModalTxt(indice) {
    this.modalRef = this.modalService.open(GenerarTxtComponent, {
      backdrop: "static",
      keyboard: false,
      windowClass: 'modalMD'
    });
    this.modalRef.componentInstance.input_contrato = indice;
    this.modalRef.componentInstance.input_tpoPlan = this.tipoPlan;
    this.modalRef.result.then(
      result => { },
      reason => { }
    );
  }

  async escogerArchivo(archivo) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, "Seleccione un periodo antes de continuar", "info");
    } else {
      await this.alertCargando();
      var selecArch = archivo.target.files[0];
      this.planillasService.cargaRHEMasiva(selecArch, this.tipoPlan.idTipoPlanilla, this.empresa.idEmpresa, this.ano.idPdoAno, this.mes.idPdoMes).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, "Carga masiva realizada correctamente", "success");
        } else if (resp.estado == 0) {
          Swal.fire(Constantes.INFO, resp.msg, "info");
        } else { Swal.fire(Constantes.ERROR, resp.msg, "error"); }
      }, (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    }
  }

  async escogerArchivoRheGeneral(archivo) {
    if (this.ano == null || this.mes == null) {
      Swal.fire(Constantes.INFO, "Seleccione un periodo antes de continuar", "info");
    } else {
      await this.alertCargando();
      var selecArch = archivo.target.files[0];
      debugger
      this.planillasService.cargaRHEMasiva(selecArch, this.tipoPlan.idTipoPlanilla, this.empresa.idEmpresa, this.ano.idPdoAno, this.mes.idPdoMes).subscribe((resp: any) => {
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS, "Carga masiva general realizada correctamente", "success");
        } else if (resp.estado == 0) {
          Swal.fire(Constantes.INFO, resp.msg, "info");
        } else { Swal.fire(Constantes.ERROR, resp.msg, "error"); }
      }, (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    }
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
