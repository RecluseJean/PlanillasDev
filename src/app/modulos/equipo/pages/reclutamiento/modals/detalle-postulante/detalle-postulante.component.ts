import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reclutamiento } from '../../../../../../models/Reclutamiento';
import { Postulante } from '../../../../../../models/postulante';
import { PostulanteService } from '../../../../services/postulante/postulante.service';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styles: []
})
export class DetallePostulanteComponent implements OnInit {

  @Input() input_reclutamiento;
  @Input() input_postulante_final;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    public router: Router
  ) { }

  lsPostulaciones: any [] = [];
  public postulante: any = new Postulante();
  reclutamiento:any = new Reclutamiento();

  objReclutamiento: any = null;

  ngOnInit() { //debugger
    this.postulante=this.input_postulante_final;
    this.reclutamiento=this.input_reclutamiento;
    this.listarDetallePostulaciones();
    
  }

  listarDetallePostulaciones(){ //debugger

    //this.objReclutamiento = this.reclutamiento;
    var posdto = {
      postulante: this.postulante,
      reclutamiento: this.reclutamiento
    }
    this.postulanteService.listarPostulaciones(posdto).subscribe((resp: any) => {
      this.lsPostulaciones = resp.aaData;
      //console.log('listarPostulaciones',resp.aaData);
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
  
  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
