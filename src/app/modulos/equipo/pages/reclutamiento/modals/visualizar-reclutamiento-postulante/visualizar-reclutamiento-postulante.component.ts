import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reclutamiento } from '../../../../../../models/Reclutamiento';
import { Postulante } from '../../../../../../models/postulante';
import { ConfirmarpostulanteComponent } from '../confirmarpostulante/confirmarpostulante.component';
import { ReclutamientoService } from '../../../../services/reclutamiento/reclutamiento.service';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfirmarCvPostulanteComponent } from './confirmar-cv-postulante/confirmar-cv-postulante/confirmar-cv-postulante.component';


@Component({
  selector: 'app-visualizar-reclutamiento-postulante',
  templateUrl: './visualizar-reclutamiento-postulante.component.html',
  styles: []
})
export class VisualizarReclutamientoPostulanteComponent implements OnInit {

  @Input() input_reclutamiento;
  @Input() input_selecArch;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public reclutamientoService: ReclutamientoService,
    public router: Router
  ) { }

  selecArch: File;
  reclutamiento: any = new Reclutamiento;
  postulante: any = new Postulante;
  modalRef: NgbModalRef;
  payloadArray = {
    enabled: false
  }

  ngOnInit() {
    this.reclutamiento = this.input_reclutamiento;
    this.selecArch = this.input_selecArch;

  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  enviarCorreoPostulante(pos) {
    var posdto = {
      postulante: pos.postulante
    }
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
    /* var posdto = {
     postulante:pos.postulante
   } */
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

  onClick() {

  }

  abrirCheckBox() {
  }

  visibilidad() {
    var elemento = document.getElementById("informacion").style.display = "none";
  }

  seleccionPostulante() { }

  subirArchivo(archivo, pos) {
    this.selecArch = archivo.target.files[0];
    //this.postulante=pos;
    //this.cargarArchivo(pos);
    this.openModal(pos)
  }

  /*   cargarArchivo(pos){
      const idPost = pos.idPostulante;
      this.reclutamientoService.subirArchivo(this.selecArch,idPost).subscribe((resp:any)=>{
        if (resp.estado == 1) {
          Swal.fire(Constantes.SUCCESS,resp.msg,'success');
          } else if(resp.estado == 2){
            Swal.fire(Constantes.WARNING,resp.msg,'warning');
          }else if(resp.estado == 0){
            Swal.fire(Constantes.WARNING,resp.msg,'warning');
          }
          else if(resp.estado == 3){
           // Swal.fire(Constantes.SUCCESS,resp.msg,'success');
            this.openModal(pos)
          }
      })
    } */

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  openModal(pos) {
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
      // this.listarUtl();
      this.activemodal.dismiss();
    });
  }

}
