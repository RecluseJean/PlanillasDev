import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../../models/Empresa';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GestionEquipoService } from '../../services/gestion-equipo/gestion-equipo.service';
import { NuevaSolicitudComponent } from './modals/nueva-solicitud/nueva-solicitud.component';
import { MatTableDataSource } from '@angular/material';
import Constantes from '../../../../models/Constantes';

import { NuevoEquipoComponent } from './modals/nuevo-equipo/nuevo-equipo.component';
import { VisualizarSolicitudEmpresaComponent } from './modals/visualizar-solicitud-empresa/visualizar-solicitud-empresa.component';
import { VisualizarEquipoTrabajadorComponent } from './modals/visualizar-equipo-trabajador/visualizar-equipo-trabajador.component';
import { NuevoTrabajadorEquipoComponent } from './modals/nuevo-trabajador-equipo/nuevo-trabajador-equipo.component';
import { NuevaSolicitudEmpresaComponent } from './modals/nueva-solicitud-empresa/nueva-solicitud-empresa.component';
import { ConfirmarEliminarSolicitudComponent } from './modals/confirmar-eliminar-solicitud/confirmar-eliminar-solicitud.component';
import { EquipoService } from '../../services/equipo/equipo.service';



@Component({
  selector: 'app-gestion-equipo',
  templateUrl: './gestion-equipo.component.html',
  styles: ["node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class GestionEquipoComponent implements OnInit {

  constructor(
    public modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public gestionEquipoService: GestionEquipoService,
    public equipoService: EquipoService,
   
  ) { }

  empresa: Empresa = new Empresa();
  token: any;
  infoToken: any;

  checkND: any;
  checkNB: any;

  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean;
  lsSolicitudxSupervisor = null //: any [] = [];
  lsSolicitudxSupervisorFilter: any [] = [];
  lsEquipoxSupervisorFilter: any [] = [];
  lsEquipoxSupervisor = null;
  lsEquipoxGerenteFilter:any [] = [];
  lsEquipoxGerente = null;
  lsEquipoxEmpresaFilter: any [] = [];
  lsEquipoxEmpresa= null
  modalRef: NgbModalRef;

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

  displayedColumns2: string[] = [
    'descripcion',
    'visualizar',
    'agregar'
  ];

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this.token = JSON.parse(localStorage.getItem('InfoToken'));
    //this.checkND = document.getElementById('numDoc');
    //this.checkNB = document.getElementById('nomCmp');
    if (this.empresa != null) {
      this.checkAction();
      this.listarSolicitudxSupervisor();
      this.listarEquipoxSupervisor();
      this.listarEquipoxEmpresa();
      this.listarEquipoxGerente();
      
    }
  }

  checkAction() {
    // this.filterPost = "";

    // if (this.checkND.checked == true) {
    //   this.mostrarPH = "Ingrese numero de documento";
    //   this.filterBoolean = true;
    // } else {
    //   this.mostrarPH = "Apellido paterno + Apellido Materno + Nombres";
    //   this.filterBoolean = false;
    // }
  }

  applyFilter(event: Event) { //debugger
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

  listarSolicitudxSupervisor() {
    var usuario = { "idUsuario": this.token.id_usuario  }
    this.gestionEquipoService.listarSolicitudxSupervisor(usuario).subscribe((resp: any) => {
      //this.lsSolicitudxSupervisor = resp.aaData;
      this.lsSolicitudxSupervisorFilter = resp.aaData;
      this.lsSolicitudxSupervisor = new MatTableDataSource<Object>(this.lsSolicitudxSupervisorFilter);
      //console.log( resp.aaData);
    })
   }

   listarEquipoxEmpresa() {
 
    this.equipoService.listarEquipoxEmpresa(this.empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
     //   let lsEquipoxEmpresaFilter: Empresa[] = [];
        this.lsEquipoxEmpresaFilter = resp.aaData;
        this.lsEquipoxEmpresa = new MatTableDataSource<Empresa>(this.lsEquipoxEmpresaFilter);
        //this.lsEquipoxEmpresa.paginator = this.paginator;
        console.log('lsEquipoxEmpresa',resp.aaData);
      }
      })
    }

  listarEquipoxGerente() {
 
   this.equipoService.listarEquipoxGerente(this.empresa).subscribe((resp: any) => {
   if (resp.estado == 1) {
  //   let lsEquipoxGerenteFilter: Empresa[] = [];
     this.lsEquipoxGerenteFilter = resp.aaData;
     this.lsEquipoxGerente = new MatTableDataSource<Empresa>(this.lsEquipoxGerenteFilter);
     //this.lsEquipoxEmpresa.paginator = this.paginator;
     console.log('lsEquipoxGerente',resp.aaData);
   }
   })
 }

    listarEquipoxSupervisor() {
    var tmp_user = {
      "usuario": { "idUsuario": this.token.id_usuario }
    }
    this.equipoService.listarEquipoxSupervisor(tmp_user).subscribe((resp: any) => {
      this.lsEquipoxSupervisorFilter = resp.aaData;
      this.lsEquipoxSupervisor = new MatTableDataSource<Empresa>(this.lsEquipoxSupervisorFilter);
      console.log("listarEquipoxSupervisor",resp.aaData);   
    })
  }


  registrarSolicitud() {
    this.modalRef = this.modalService.open(NuevaSolicitudComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  crearEquipo() {
    let indice = null;
    this.openModal(indice);
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



}
