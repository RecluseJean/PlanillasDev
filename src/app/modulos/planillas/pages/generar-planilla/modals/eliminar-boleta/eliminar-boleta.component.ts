import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanillasService } from '../../../../services/planillas/planillas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';


@Component({
    selector: 'app-eliminar-boleta',
  templateUrl: './eliminar-boleta.component.html',
  styles: []
})
export class EliminarBoletaComponent implements OnInit {
    
    @Input() input_planilla;
    

    planilla: any;

    constructor(
        public activemodal : NgbActiveModal,
        public PlanillasService: PlanillasService,
        public router: Router,
    ){}

    ngOnInit(){
        this.planilla = this.input_planilla;
    }

    eliminar(){
        this.PlanillasService.eliminarPlanilla(this.planilla).subscribe((resp:any)=> {
            if (resp.estado == 1) {
              Swal.fire(Constantes.SUCCESS,resp.msg,'success');
              // this.refrescar(this.router.url);
              this.activemodal.dismiss();
              } else {Swal.fire(Constantes.ERROR,resp.msg,'error');}
              },
              (err) =>{
                Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
                this.activemodal.dismiss();
            });
             
    }
    public refrescar(url){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([url]));
      }
    
      close(){
        this.activemodal.dismiss('Cancelado');
      }

    
}