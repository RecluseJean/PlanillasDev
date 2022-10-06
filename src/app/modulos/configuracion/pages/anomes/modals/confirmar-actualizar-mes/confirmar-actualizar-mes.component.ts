import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AnoMesService } from '../../../../services/anomes/anomes.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Mes } from '../../../../../../models/Mes';

@Component({
  selector: 'app-confirmar-actualizar-mes',
  templateUrl: './confirmar-actualizar-mes.component.html',
  styles: []
})
export class ConfirmarActualizarMesComponent implements OnInit {

  @Input() input_mes;

  constructor(
    public activemodal : NgbActiveModal,
    public router: Router,
    public anomesService: AnoMesService
  ) { }

  mes:Mes = new Mes();


  ngOnInit() {
    this.mes = this.input_mes;
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }

  actualizarMes() {
    this.anomesService.actualizarMes(this.mes).subscribe((resp:any) => {
      
     if(resp.estado==1){
       Swal.fire(Constantes.SUCCESS,resp.msg,'success');
                this.refrescar(this.router.url); 

      }}, (err) =>{
        Swal.fire(Constantes.ERROR, err.status+" "+err.error.error,'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }
}