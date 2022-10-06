import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Postulante } from '../../../../../../../../models/postulante';
import { ReclutamientoService } from '../../../../../../services/reclutamiento/reclutamiento.service';
import { Reclutamiento } from '../../../../../../../../models/Reclutamiento';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../../../models/Constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-cv-postulante',
  templateUrl: './confirmar-cv-postulante.component.html',
  styles: []
})
export class ConfirmarCvPostulanteComponent implements OnInit {

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
  pos: any;

  ngOnInit() {
    this.pos = this.input_reclutamiento;
    this.selecArch = this.input_selecArch;

  }

  /*   cargarArchivo(pos){
      const idPost = pos.idPostulante;
      this.reclutamientoService.subirArchivo(this.selecArch,idPost).subscribe((resp:any)=>{
        if (resp.estado == 3) {
            Swal.fire(Constantes.SUCCESS,resp.msg,'success');
          }
      })
    } */

  cargarArchivo(pos) {
    //this.input_postulante = pos;
    const idPost = pos.postulante.idPostulante;
    this.reclutamientoService.subirArchivo(this.selecArch, idPost).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
        this.activemodal.close();
      } else if (resp.estado == 0) {
        Swal.fire(Constantes.WARNING, resp.msg, 'warning');
        this.refrescar(this.router.url);
        this.activemodal.close();
      }
      else if (resp.estado == 3) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.activemodal.close();
        this.refrescar(this.router.url);
      }
    })
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
