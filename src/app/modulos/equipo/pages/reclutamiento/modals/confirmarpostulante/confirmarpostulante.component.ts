import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { PostulanteService } from '../../../../services/postulante/postulante.service';
@Component({
  selector: 'app-confirmarpostulante',
  templateUrl: './confirmarpostulante.component.html',
  styles: []
})
export class ConfirmarpostulanteComponent implements OnInit {

  @Input() postulanteback;
  @Input() input_solicitud;
  @Input() input_postulante_final;
  @Input() input_reclutamiento;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private postulanteService: PostulanteService,
    public router: Router
  ) { }

  public objPostulante: any = null;
  public objTipoDoc: any ;
  public objNivelEdu: any = null;
  public objOcupacion: any = null;
  public objReclutamiento: any = null;

  public postulante: any;
  public tipoDoc: number;
  public nivelEdu: number;
  public ocupacion: number;
  public reclutamiento:any;

  public objpostulante: any = null;

  //postulante: Postulante = new Postulante();
  //tipoDoc: TipoDoc = new TipoDoc();
  //nivelEdu: NivelEdu = new NivelEdu();
  //ocupacion: Ocupacion = new Ocupacion();
  ngOnInit() {
    //this.postulante = this.postulanteback;
    //this.objPostulante= this.input_solicitud;
    this.objpostulante= this.input_postulante_final;
  }

  closer(){
    this.activemodal.dismiss('Cancel')
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  confirmar(){debugger
  var posdto = {
    "postulante":this.objpostulante.postulante,
    "nivelEdu": this.objpostulante.nivelEdu,
    "ocupacion": this.objpostulante.ocupacion,
    "tipoDoc": this.objpostulante.tipoDoc,
    "reclutamiento":this.objpostulante.reclutamiento
  }
    this.postulanteService.insertarPostulante(posdto).subscribe((resp: any) => { debugger
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      }
    }, (err) => {
      Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
    });
    this.activemodal.dismiss();
  }

}
