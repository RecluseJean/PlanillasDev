import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { VacacionesService } from '../../../../services/vacaciones/vacaciones.service';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-vacacion',
  templateUrl: './confirmar-vacacion.component.html',
  styles:[]
})
export class ConfirmarVacacionComponent implements OnInit {
  
  @Input() input_vaca;
  @Input() input_dias_adelanto;
  objVaca: any;

  constructor(
    public activemodal : NgbActiveModal,
    public vacacionService: VacacionesService,
    public router : Router
  ) { }

  ngOnInit() {
    this.objVaca = this.input_vaca;
  }

  registrar(){
    switch(this.objVaca.accion){
      case 'VT': this.registrarVacaTomada();break;
      case 'VV': this.registrarVacaVendida();break;
      default: this.registrarVacaAdelantada();break;
    }
  }

  registrarVacaTomada(){
    this.vacacionService.registrarVacaTomada(this.objVaca).subscribe((resp:any)=>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close('succes');
        this.refrescar(this.router.url);
      }
      else{
        Swal.fire(Constantes.INFO,resp.msg,'info');
        this.activemodal.close('succes');
        this.refrescar(this.router.url);
      }
    })
  }

  registrarVacaVendida(){
    this.vacacionService.registrarVacaVendida(this.objVaca).subscribe((resp:any)=>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close('succes');
        this.refrescar(this.router.url);
      }
      else {
        Swal.fire(Constantes.ERROR,resp.msg,'error');
        this.activemodal.close('error');
        //this.refrescar(this.router.url);
      }
    })
  }

  registrarVacaAdelantada(){
    this.vacacionService.registrarVacaAdelantada(this.objVaca,this.input_dias_adelanto).subscribe((resp:any)=>{
      if(resp.estado==1){
        Swal.fire(Constantes.SUCCESS,resp.msg,'success');
        this.activemodal.close('succes');
        this.refrescar(this.router.url);
      } else if (resp.estado==2){
        Swal.fire(Constantes.INFO,resp.msg,'info');
        this.activemodal.close('succes');
      }
    })
  }

  close(){
    this.activemodal.dismiss('Cancelado');
  }
  public refrescar(url){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
