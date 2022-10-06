import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef,  } from '@ng-bootstrap/ng-bootstrap';
import { IuReclutamientoComponent } from './modals/iu-reclutamiento/iu-reclutamiento.component';
import { Empresa } from '../../../../models/Empresa';
import { VisualizarReclutamientoPostulanteComponent } from './modals/visualizar-reclutamiento-postulante/visualizar-reclutamiento-postulante.component';
import Constantes from '../../../../models/Constantes';
import { ReclutamientoService } from '../../services/reclutamiento/reclutamiento.service';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfirmarCvPostulanteComponent } from './modals/visualizar-reclutamiento-postulante/confirmar-cv-postulante/confirmar-cv-postulante/confirmar-cv-postulante.component';
import { DetallePostulanteComponent } from './modals/detalle-postulante/detalle-postulante.component';

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['reclutamiento.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReclutamientoComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public activemodal: NgbActiveModal,
    public router: Router,
    public reclutamientoService: ReclutamientoService
  ) { }

  
  public empresa: Empresa = new Empresa();

  lsReclutamientoxEmpresa = null //: any [] = [];
  lsReclutamientoxEmpresaFilter: any [] = [];
  selecArch: File;

  checkND: any;
  checkNB: any;
  cerrar = false;
  
  filterPost = "";
  mostrarPH = "";
  filterBoolean: boolean = true;

  modalRef: NgbModalRef;

  //lsPostulanes:any [] = [];

  expandedElement: Object | null;

  displayedColumns: string[] = [
    'puesto',
    'fecha',
    'cantidad',
    //'ver',
    'agregar'    
  ];

  ngOnInit() { //debugger
    this.empresa = JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    if (this.empresa != null) {      
      this.listarReclutamientoxEmpresa();
      //this.checkAction();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null && this.cerrar == false) {
      this.modalRef.close();
    }
  }


  applyFilter(event: Event) { //debugger
    
    this.lsReclutamientoxEmpresa = new MatTableDataSource<Object>(this.lsReclutamientoxEmpresaFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsReclutamientoxEmpresa.filter = filterValue.trim().toLowerCase();
    
  }

  /* applyFilter2(event: Event) { //debugger
     this.lsReclutamientoxEmpresaFilter.map((x) => { //debugger
      x.lista= x.lsPostulanteReclu.mapp((x) =>{
        x.nrodoc= x.postulante.nroDocumento;
        x.telefono = x.postulante.telefono;
      });      
    });
    this.lsReclutamientoxEmpresa = new MatTableDataSource<Object>(this.lsReclutamientoxEmpresaFilter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsReclutamientoxEmpresa.filter = filterValue.trim().toLowerCase();  
    
  }  */

  listarReclutamientoxEmpresa(){
    this.reclutamientoService.listarReclutamientoxEmpresa(this.empresa).subscribe((resp: any) => {
      this.lsReclutamientoxEmpresaFilter = resp.aaData;

      this.lsReclutamientoxEmpresaFilter.map((x) => { //debugger
        x.puestos = x.solicitud.puesto.snombre;
        x.fecha = x.tfechaIniReclu;
        x.des= true;
      });

      this.lsReclutamientoxEmpresa = new MatTableDataSource<Object>(this.lsReclutamientoxEmpresaFilter);
      console.log('lsReclutamientoxEmpresa',resp.aaData);
    })
  }

  visualizarPostulantesReclutamiento(reclutamiento){
    var tmp_reclutamiento=Object.assign({},reclutamiento);
    tmp_reclutamiento.accion="V"
    this.openModal(tmp_reclutamiento);
  }

  nuevoPostulante(reclutamiento) {
    var tmp_pos: any = {
      'accion': Constantes.REGISTRAR,
      reclutamiento
    }
    this.openModal(tmp_pos);
  }

  public openModal(indice) {debugger
    if (indice.accion == "V") {
      this.modalRef = this.modalService.open(VisualizarReclutamientoPostulanteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_reclutamiento = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }
    if (indice.accion == "R") { //debugger
      this.modalRef = this.modalService.open(IuReclutamientoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalReclutamiento'
        })
      this.modalRef.componentInstance.input_postulante_final = indice;
      this.modalRef.componentInstance.input_reclutamiento = indice;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

    if (indice.accion == "VDP") { //debugger
      this.modalRef = this.modalService.open(DetallePostulanteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_postulante_final = indice.pos.postulante;
      this.modalRef.componentInstance.input_reclutamiento = indice.reclutamiento;
      this.modalRef.result.then((result) => {
      }, (reason) => {
      });
    }

  }

  verDetallePostulantes(reclutamiento,pos){ //debugger
    var tmp_postulante: any = {
      'accion': Constantes.DETALLEPOSTULANTE,
      reclutamiento, pos
    }    
    //Object.assign({},reclutamiento,pos);
    //tmp_postulante.accion="VDP"
    this.openModal(tmp_postulante);
  }

  enviarCorreoPostulante(pos) {
    var posdto = {  postulante: pos.postulante  }
    this.reclutamientoService.enviarCorreo(posdto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })
  }

  anadirListaNegra(pos) {
    const postulante = pos.postulante;
    this.reclutamientoService.anadirListaNegraPostulante(postulante).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
      this.activemodal.dismiss();
    })
  }

  subirArchivo(archivo, pos) {
    this.selecArch = archivo.target.files[0];
    //this.postulante=pos;
    //this.cargarArchivo(pos);
    this.openModalArchivo(pos)
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
  
  public openModalArchivo(pos) {
    const idPost = pos.postulante.idPostulante;
    const modalRef = this.modalService.open(ConfirmarCvPostulanteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    modalRef.componentInstance.input_reclutamiento = pos;
    modalRef.componentInstance.input_selecArch = this.selecArch;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  checkAction(id, post) { //debugger

    post.des = false
    this.checkND = document.getElementById('numDoc'+ id);
    this.checkNB = document.getElementById('nomCmp'+ id);
    this.filterPost = "";
    if (this.checkND.checked == true) {
      this.mostrarPH = "Ingrese numero de documento";
      this.filterBoolean = true;
    } else {
      this.mostrarPH = "Apellido paterno + Apellido Materno + Nombres";
      this.filterBoolean = false;
    }
  }

  deshabilitarbusc(){
    for (const pos of this.lsReclutamientoxEmpresaFilter) {
      pos.des=true
      this.checkND = document.getElementById('numDoc'+ pos.iidReclutamiento);
      this.checkND.checked=false
      this.checkNB = document.getElementById('nomCmp'+  pos.iidReclutamiento);
      this.checkNB.checked=false
    }
    //this.lsReclutamientoxEmpresa = new MatTableDataSource<Object>(this.lsReclutamientoxEmpresaFilter);
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  /* NuevoReclutamiento(){
    const objreclutamiento = this.modalService.open(IuReclutamientoComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'modalReclutamiento'
    });
    objreclutamiento.result.then((result) => {
    }, (reason) => {
    });
  } */



}
