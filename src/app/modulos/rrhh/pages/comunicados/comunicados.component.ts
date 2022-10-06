import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import Constantes from '../../../../models/Constantes';
import { ComunicadosService } from '../../services/comunicados/comunicados.service';
import { AreaDepartamentoEmpresaService } from '../../services/area-departamento-empresa/area-departamento-empresa.service';
import { NuevaActividadComponent } from './modals/nueva-actividad/nueva-actividad.component';
import { NuevaActividadConfirmarComponent } from './modals/nueva-actividad-confirmar/nueva-actividad-confirmar.component';
import { NuevaNotaComponent } from './modals/nueva-nota/nueva-nota.component';
import { NuevaNotaConfirmarComponent } from './modals/nueva-nota-confirmar/nueva-nota-confirmar.component';
import { NuevoCronogramaComponent } from './modals/nuevo-cronograma/nuevo-cronograma.component';
import { TrabajadorService } from '../../../trabajador/services/trabajador/trabajador.service';


const publicIp = require('public-ip');

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styles: []
})
export class ComunicadosComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('paginatorlsTrabajadorPlanilla', { static: true }) paginatorlsTrabajadorPlanilla: MatPaginator;
  @ViewChild('paginatorlsTrabajadorHonorario', { static: true }) paginatorlsTrabajadorHonorario: MatPaginator;
  @ViewChild('paginatorlsNotas', { static: true }) paginatorlsNotas: MatPaginator;

  constructor(
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public comunicadosService: ComunicadosService,
    private areaDepartamentoEmpresaService: AreaDepartamentoEmpresaService,
    public trabajadorService: TrabajadorService,
  ) { }


  empresa: any = new Empresa();
  public listAreaDepEmp: Array<any> = [];
  public listNotasEmp: Array<any> = [];
  public lsTrabPla: any[] = [];
  public lsTrabHon: any[] = [];
  public listDepEmp: any[] = [];
  lsTrabajadorHonorario = null;
  lsTrabajadorHonorarioFilter: any[] = [];
  lsTrabajadorHonorarioInacFilter: any[] = [];
  lsTrabajadorPlanillaFilter: any[] = [];
  lsTrabajadorPlanillaInacFilter: any[] = [];

  lsTrabajadorPlanillaInac = null;
  data=null;
  lsNotas=null;
  error: any;

  trabHonorarioEstado = true;
  trabPlanillaEstado = true;


  lsTrabajadorPlanilla = null;

  expandedElement: Object | null;
  modalRef: NgbModalRef;
  

  displayedColumns: string[] = [
    'asun',
    'puesto',
    'fech_pub',
    'horIniDia',
    'horFinDia',
    'editar', 
    'eliminar'
  ];

  displayed1Columns: string[] = [
    'numdoc',
    'apenom',
    'puesto', 
    'fechnac'
  ];

  displayed2Columns: string[] = [
    'asun',
    'fech_pub',
    'editar', 
    'eliminar'
  ];

  displayed3Columns: string[] = [
    'desc',
    'fech_pub',
    'editar', 
    'eliminar'
  ];

  displayed4Columns: string[] = [
    'desc',
    'fech_pub',
    'correo',
    'num_doc',
    'tip_rec',
    'editar', 
    'eliminar'
  ];




  activoActive = "";
  inactivoActive = "";
  defaultTab : any;
  activoShow = "";
  inactivoShow = "";
  ipPublica: string;
  lsDepartamentoEmpresa:any [] = [];
  lsNotasEmpresa:any [] = [];
  lsCumpleaños:any [] = [];
  lsTrabajadorHonorarioInac = null;

  ngOnInit() {debugger
    (async () => {
      this.ipPublica = await publicIp.v4();
    })();
    this.gestionarTabs();

    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    if(this.empresa != null){debugger

      this.listarActividadesPorEmpresa();
      this.listarTrabajadorPlanilla();
      this.listarTrabajadorHonorario();
      this.listarNotasPorEmpresa();
    }
  }

  public listarTrabajadorPlanilla() {
    this.comunicadosService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 1, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {debugger
        this.lsTrabPla = resp.aaData;
        this.lsTrabajadorPlanilla = new MatTableDataSource<Object>(this.lsTrabPla);
        this.lsTrabajadorPlanilla.paginator = this.paginatorlsTrabajadorPlanilla;

        console.log('lsCumpleaños',resp.aaData);
      }
    });
    return this.lsTrabPla;
  }

  listarNotasPorEmpresa() {debugger
    var empresa = {
      "idEmpresa": this.empresa.idEmpresa
    }
    this.comunicadosService.listarNotasPorEmp(empresa).subscribe((resp: any) => {debugger
      this.listNotasEmp = resp.aaData;
      this.lsNotas=new MatTableDataSource<Object>(this.listNotasEmp);
      this.lsNotas.paginator = this.paginatorlsNotas;
      
      console.log('lsNotasEmpresa',resp.aaData);
    });
    return this.listNotasEmp;
  }

  public listarTrabajadorHonorario() {
    this.comunicadosService.listarTrabajadorPorComprobanteYSituacion(this.empresa.idEmpresa, 2, 1).subscribe((resp: any) => {
      if (resp.estado == 1) {debugger
        this.lsTrabHon = resp.aaData;
        this.lsTrabajadorHonorario = new MatTableDataSource<Object>(this.lsTrabHon);
        this.lsTrabajadorHonorario.paginator = this.paginatorlsTrabajadorHonorario;

        console.log('lsCumpleaños2',resp.aaData);
      }
    });
    return this.lsTrabHon;
  }

  listarActividadesPorEmpresa() {debugger
    var empresa = {
      "idEmpresa": this.empresa.idEmpresa
    }
    this.comunicadosService.listarActividadesPorEmp(empresa).subscribe((resp: any) => {debugger
      this.listAreaDepEmp = resp.aaData;
      this.data=new MatTableDataSource<Object>(this.listAreaDepEmp);
      this.data.paginator = this.paginator;
      
      console.log('lsDepartamentoEmpresa',resp.aaData);
    });
    return this.listAreaDepEmp;
  }







  cambiarTabs(valor){
    this.defaultTab.pagTrabajador.estado = valor;
    localStorage.setItem("defaultTabs", JSON.stringify(this.defaultTab));
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


  public actualizarDepartamentoEmpresa(departamentoEmpresa_u) {

  }

  eliminarDepartamentoEmpresa(departamentoEmpresa_d) {

  }

  nuevaActividad() {debugger
    let indice = "A";
    this.openModal(indice);
  }

  nuevaNota() {debugger
    let indice = "N";
    this.openModal(indice);
  }

  nuevaReunion() {debugger
    let indice = "R";
    this.openModal(indice);
  }

  nuevaSugerencia() {debugger
    let indice = "S";
    this.openModal(indice);
  }

  public openModal(indice) {

    switch (indice) {
      case 'A': this.modalRef = this.modalService.open(NuevaActividadComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
        this.modalRef.componentInstance.input_trabajador_final = indice;
        break;


      case 'N': this.modalRef = this.modalService.open(NuevaNotaComponent,
          {
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
          }
        );
          this.modalRef.componentInstance.input_trabajador_final = indice;
         break;

         case 'R': this.modalRef = this.modalService.open(NuevoCronogramaComponent,
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

  cambiarEstadoHonorario(estado: boolean) {debugger
    this.trabHonorarioEstado = estado;
  }
  cambiarEstadoPlanilla(estado: boolean) {
    this.trabPlanillaEstado = estado;
  }



 


}
