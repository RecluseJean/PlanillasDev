import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Empresa } from '../../../../models/Empresa';
import { Trabajador } from '../../../../models/Trabajador';
import Constantes from '../../../../models/Constantes';
import { EquipoService } from '../../services/equipo/equipo.service';
import { Usuario } from '../../../../models/usuario.model';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';
import { Solicitud } from '../../../../models/Solicitud';
import { MatTableDataSource } from '@angular/material';
import { NuevoEquipoComponent } from './modals/nuevo-equipo/nuevo-equipo.component';
import { VisualizarSolicitudEmpresaComponent } from './modals/visualizar-solicitud-empresa/visualizar-solicitud-empresa.component';
import { VisualizarEquipoTrabajadorComponent } from './modals/visualizar-equipo-trabajador/visualizar-equipo-trabajador.component';
import { NuevoTrabajadorEquipoComponent } from './modals/nuevo-trabajador-equipo/nuevo-trabajador-equipo.component';
import { NuevaSolicitudEmpresaComponent } from './modals/nueva-solicitud-empresa/nueva-solicitud-empresa.component';
import { ConfirmarEliminarSolicitudComponent } from './modals/confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: ["node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class SolicitudComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public solicitudService: SolicitudService ,
    public trabajadorService: TrabajadorService,
    public equipoService: EquipoService
  ) { }

  modalRef: NgbModalRef;
  public empresa: Empresa = new Empresa();
  public trabajador: any = new Trabajador();
  public usuario: any = new Usuario();
  //public solicitud: any = new Solicitud();

  infoToken: any;

  lsSolicitudxEmpresa = null; //: any [] = [];
  lsSolicitudxEmpresaFilter: any [] = [];
  lsSolicitudxSupervisor = null //: any [] = [];
  lsSolicitudxSupervisorFilter: any [] = [];

  lsEquipoxSupervisor: any [] = [];
  //lsEquipoxSupervisorFilter: any [] = [];
  lsTrabajadorEmpresa: any [] = [];
  //lsTrabajadorEmpresaFilter: any [] = [];

  displayedColumns: string[] = [
    'puesto',
    'solicitante',
    'fecha',
    'estado',
    'ver',
    'cancelar',
    'revision',
    'aprobar',
    'rechazar'
  ];


  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.infoToken = JSON.parse(localStorage.getItem("InfoToken"));
    this.trabajador = JSON.parse(localStorage.getItem('InfoToken')).trabajador;
    this.usuario = JSON.parse(localStorage.getItem('InfoToken'));

    if(this.empresa!=null) {
      if (this.infoToken.id_perfil!= 4) {debugger
        this.listarSolicitudxEmpresa();
        this.listarTrabajadoresxEmpresa();  
      } else {
        this.listarSolicitudxSupervisor();
        this.listarEquipoxSupervisor();
        this.listarTrabajadoresxEmpresa();
      }
    }   

    /* if (this.trabajador != null) {
      this.listarSolicitudxSupervisor();
      this.listarEquipoxSupervisor();
      this.listarTrabajadoresxEmpresa();
      console.log(this.listarSolicitudxSupervisor());
    } */
  }

  public listarSolicitudxEmpresa() {
    this.solicitudService.listarSolicitudxEmpresa(this.empresa).subscribe((resp: any) => {
      this.lsSolicitudxEmpresaFilter = resp.aaData;
      this.lsSolicitudxEmpresa = new MatTableDataSource<Object>(this.lsSolicitudxEmpresaFilter);
      this.lsSolicitudxEmpresa.paginator = this.paginator;
      //console.log('lsSolicitudxEmpresa',resp.aaData);
    })
  }

  listarSolicitudxSupervisor() {
    var usuario = { "idUsuario": this.infoToken.id_usuario }
    this.solicitudService.listarSolicitudxSupervisor(usuario).subscribe((resp: any) => {
      this.lsSolicitudxSupervisorFilter = resp.aaData;
      this.lsSolicitudxSupervisor = new MatTableDataSource<Object>(this.lsSolicitudxSupervisorFilter);
      this.lsSolicitudxSupervisor = this.paginator;
      //console.log('lsSolicitudxSupervisor', resp.aaData);
    })
   }

  listarEquipoxSupervisor() {
    var tmp_user = {
      "usuario": { "idUsuario": this.infoToken.id_usuario }
    }
    this.equipoService.listarEquipoxSupervisor(tmp_user).subscribe((resp: any) => {
      this.lsEquipoxSupervisor = resp.aaData;   
    })
  }

   listarTrabajadoresxEmpresa() {
    this.trabajadorService.listarTrabajador(this.empresa).subscribe((resp: any) => {
      this.lsTrabajadorEmpresa = resp.aaData;
    })
  }

  applyFilter(event: Event) { //debugger
    this.lsSolicitudxEmpresaFilter.map((x) => { //debugger
      x.puestos = x.puesto.snombre;
      x.solicitantes = x.usuario.trabajador==null? x.usuario.perfil.nombres :x.usuario.trabajador.apePater + ' ' + x.usuario.trabajador.apeMater + ' ' + x.usuario.trabajador.nombres;
      x.estado = x.iestado;

    });

    this.lsSolicitudxEmpresa = new MatTableDataSource<Object>(this.lsSolicitudxEmpresaFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsSolicitudxEmpresa.filter = filterValue.trim().toLowerCase();

    /* if (this.lsTrabajadorPlanilla.paginator) {
      this.lsTrabajadorPlanilla.paginator.firstPage();
    } */
  }

  applyFilter2(event: Event) { //debugger
    this.lsSolicitudxSupervisorFilter.map((x) => { //debugger
      x.puestos = x.puesto.snombre;
      x.solicitantes = x.usuario.trabajador==null? x.usuario.perfil.nombres :x.usuario.trabajador.apePater + ' ' + x.usuario.trabajador.apeMater + ' ' + x.usuario.trabajador.nombres;
      x.estado = x.iestado;

    });

    this.lsSolicitudxSupervisor = new MatTableDataSource<Object>(this.lsSolicitudxSupervisorFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsSolicitudxSupervisor.filter = filterValue.trim().toLowerCase();

    /* if (this.lsTrabajadorPlanilla.paginator) {
      this.lsTrabajadorPlanilla.paginator.firstPage();
    } */
  } 

  cancelarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion=Constantes.CANCELARSOLICITUD
    this.openModal(tmp_solicitud);
  }

  revisionSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion=Constantes.SOLICITUDREVISION
    this.openModal(tmp_solicitud);
  }

  aprobarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion=Constantes.SOLICITUDAPROBADA
    this.openModal(tmp_solicitud);
  }
  rechazarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion=Constantes.SOLICITUDRECHAZADA
    this.openModal(tmp_solicitud);
  }

  visualizarSolicitud(solicitud){
    var tmp_solicitud=Object.assign({},solicitud);
    tmp_solicitud.accion="V"
    this.openModal(tmp_solicitud);
  }

  eliminarSolicitud(solicitud) {
    var tmp_Solicitud = Object.assign({}, solicitud);
    tmp_Solicitud.accion = Constantes.ELIMINAR;
    this.openModal(tmp_Solicitud);
  }

  visualizarEquipo(equipo){
    var tmp_equipo=Object.assign({},equipo);
    tmp_equipo.accion="VE"
    this.openModal(tmp_equipo);
  }

  registrarTrabajEquip(equipo){
    var tmp_equipo=Object.assign({},equipo);
    tmp_equipo.accion="RTE"
    this.openModal(tmp_equipo);
  }

  crearEquipo() {
    let indice = null;
    this.openModal(indice);
  }

  public crearSolicitudRecurso() {
    var solicitudRecurso: any =  new Solicitud();
    solicitudRecurso.accion = "CSR";
    this.openModal(solicitudRecurso);
  }

  openModal(indice) {
    if (indice == null ) {
      this.modalRef = this.modalService.open(NuevoEquipoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_equipo = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    } else if  (indice.accion == "V") {
      this.modalRef = this.modalService.open(VisualizarSolicitudEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_solicitud = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    } else if  (indice.accion == "VE") {
      this.modalRef = this.modalService.open(VisualizarEquipoTrabajadorComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_equipo = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }  else if  (indice.accion == "RTE") {
      this.modalRef = this.modalService.open(NuevoTrabajadorEquipoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_equipo = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    } else if  (indice.accion == "CSR") {
      this.modalRef = this.modalService.open(NuevaSolicitudEmpresaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_solicitud = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    } else {
      this.modalRef = this.modalService.open(ConfirmarEliminarSolicitudComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        }
      );
      this.modalRef.componentInstance.input_solicitudDto = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });

    }
  }

}
