import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoPlanillaService } from '../../../../services/tipo-planilla/tipo-planilla.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-perfiles-planilla',
  templateUrl: './confirmar-perfiles-planilla.component.html',
  styles: []
})
export class ConfirmarPerfilesPlanillaComponent implements OnInit {
  @Input() input_lsTipoPlanillaPerfil;
  lsTipoPlanillaPefil: any[]=[];
  estado: number = 0;

  constructor(
    public tipoPlanillaService: TipoPlanillaService,
    public activemodal: NgbActiveModal,
    public router: Router,
  ) { }

  ngOnInit() {
    this.lsTipoPlanillaPefil = this.input_lsTipoPlanillaPerfil;
  }

  crud(){
    this.actualizarPerfiles();
  }

  actualizarPerfiles(){
    var tmp ={
      'lsTipoPlanillaPerfil':this.lsTipoPlanillaPefil
    }
    this.tipoPlanillaService.actualizarPerfiles(tmp).subscribe((resp:any)=>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success')
        this.estado = 1;
      }
    },
    (error)=>{
      Swal.fire(Constantes.ERROR,error.error,'error');
    });
    this.activemodal.close();
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
